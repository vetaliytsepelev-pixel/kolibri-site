<?php
/*
 * Приём заявки с сайта «Колибри» (форма «Записаться» и «Оставить отзыв»).
 * 1) сохраняет копию заявки на сервере (хостинг в РФ — требование 152-ФЗ о первичном сборе данных в России);
 * 2) отправляет письмо на почту клиники;
 * 3) присылает администратору в MAX короткое уведомление (по умолчанию без имени и телефона).
 * Отвечает JSON: {"ok":true} или {"ok":false,"error":"…"}. Настройки — form/config.php.
 */
ini_set('display_errors', '0'); // предупреждения PHP не должны портить JSON-ответ
require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(bool $ok, string $error = '', int $code = 200): void
{
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(false, 'Метод не поддерживается.', 405);
$cfg = kolibri_config();
if ($cfg === null) reply(false, 'Онлайн-запись временно недоступна.', 503);

// заявки принимаем только со своего сайта
$origin = rtrim((string)($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
$allowed = rtrim((string)($cfg['site_origin'] ?? ''), '/');
if ($origin !== '' && $allowed !== '' && strcasecmp($origin, $allowed) !== 0 && strcasecmp($origin, preg_replace('~//~', '//www.', $allowed, 1)) !== 0) {
    reply(false, 'Заявка отправлена не с сайта клиники.', 403);
}

// ловушки для спам-ботов: скрытое поле заполнено или форма отправлена быстрее чем за 3 секунды — «принимаем» молча
$started = (int)($_POST['started'] ?? 0);
if (trim((string)($_POST['website'] ?? '')) !== '' || ($started > 0 && (microtime(true) * 1000 - $started) < 3000)) reply(true);

$type    = ($_POST['type'] ?? '') === 'otzyv' ? 'otzyv' : 'zapis';
$name    = kolibri_cut((string)($_POST['name'] ?? ''), 80);
$phone   = kolibri_cut((string)($_POST['phone'] ?? ''), 30);
$doctor  = kolibri_cut((string)($_POST['doctor_name'] ?? ''), 150);
$comment = kolibri_cut((string)($_POST['comment'] ?? ''), 1000);
$page    = kolibri_cut((string)($_POST['page'] ?? ''), 200);
$digits  = preg_replace('~\D~', '', $phone);

if ($name === '') reply(false, 'Напишите, пожалуйста, как к вам обращаться.');
if (strlen($digits) < 10 || strlen($digits) > 15) reply(false, 'Проверьте номер телефона.');
if (($_POST['consent'] ?? '') !== '1') reply(false, 'Нужно согласие на обработку персональных данных.');

$dir = kolibri_data_dir($cfg);

// не больше 5 заявок за 10 минут с одного адреса (адрес хранится только в виде хеша и только 10 минут)
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . ($cfg['setup_key'] ?? 'kolibri'));
$rateFile = $dir . '/rate-' . substr($ipHash, 0, 16) . '.txt';
$now = time();
$hits = is_file($rateFile) ? array_filter(array_map('intval', explode("\n", (string)file_get_contents($rateFile))), function ($t) use ($now) { return $t > $now - 600; }) : [];
if (count($hits) >= 5) reply(false, 'Слишком много заявок подряд. Попробуйте позже или позвоните нам.');
$hits[] = $now;
@file_put_contents($rateFile, implode("\n", $hits), LOCK_EX);
foreach (glob($dir . '/rate-*.txt') ?: [] as $f) if (@filemtime($f) < $now - 600) @unlink($f);

$when = date('d.m.Y H:i');
$kind = $type === 'otzyv' ? 'Отзыв' : 'Запись на приём';

// 1) копия заявки на сервере: CSV по месяцам (открывается в Excel)
$saved = false;
$csv = $dir . '/zayavki-' . date('Y-m') . '.csv';
$isNew = !is_file($csv);
if ($fh = @fopen($csv, 'ab')) {
    if (flock($fh, LOCK_EX)) {
        if ($isNew) { fwrite($fh, "\xEF\xBB\xBF"); fputcsv($fh, ['Дата и время', 'Тип', 'Имя', 'Телефон', 'Врач или услуга', 'Комментарий', 'Страница'], ';', '"', ''); }
        $saved = fputcsv($fh, [$when, $kind, $name, $phone, $doctor, $comment, $page], ';', '"', '') !== false;
        flock($fh, LOCK_UN);
    }
    fclose($fh);
}
if (!$saved) kolibri_log($cfg, 'не удалось сохранить заявку в ' . $csv);

// старые копии заявок удаляем (срок хранения — keep_months)
$keep = max(1, (int)($cfg['keep_months'] ?? 12));
foreach (glob($dir . '/zayavki-*.csv') ?: [] as $f) {
    if (preg_match('~zayavki-(\d{4})-(\d{2})\.csv$~', $f, $m) && mktime(0, 0, 0, (int)$m[2] + $keep + 1, 1, (int)$m[1]) < $now) @unlink($f);
}

// 2) письмо на почту клиники
$site = preg_replace('~^https?://~', '', $allowed) ?: 'сайт';
$body = "Новая заявка с сайта $site\n\n"
      . "Тип: $kind\n"
      . "Имя: $name\n"
      . "Телефон: $phone\n"
      . "Врач или услуга: " . ($doctor !== '' ? $doctor : 'не выбран — подобрать') . "\n"
      . "Комментарий: " . ($comment !== '' ? $comment : '—') . "\n"
      . "Дата и время: $when\n"
      . "Страница: " . ($page !== '' ? $page : '—') . "\n\n"
      . "Пациент дал согласие на обработку персональных данных (галочка в форме).\n";
$mailed = kolibri_mail($cfg, ($type === 'otzyv' ? 'Отзыв с сайта: ' : 'Заявка с сайта: ') . $name . ', ' . $when, $body);

// 3) уведомление в MAX
$text = $type === 'otzyv'
    ? "Новый отзыв с сайта, $when. Текст — на почте " . ($cfg['email_to'] ?? '') . '.'
    : "Новая заявка с сайта: запись" . ($doctor !== '' ? ' — ' . $doctor : ', врач не выбран') . ", $when. Подробности — на почте " . ($cfg['email_to'] ?? '') . '.';
if (!empty($cfg['max_include_contacts'])) $text .= "\n$name, $phone";
kolibri_max_notify($cfg, $text);

if (!$saved && !$mailed) reply(false, 'Не получилось отправить заявку.', 500);
reply(true);
