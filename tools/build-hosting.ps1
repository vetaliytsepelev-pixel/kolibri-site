# Сборка сайта «Колибри» для хостинга reg.ru (kolibri.clinic).
#   & .\tools\build-hosting.ps1   → папка «Сайт\для-хостинга\kolibri.clinic» и архив «Сайт\для-хостинга\kolibri-site.zip»
# Отличия от демо на GitHub: без внутренних материалов для клиента (концепция приложения, ростомер),
# форма записи отправляет заявки на form/send.php, версии в адресах css/js против старого кэша браузера.
# Архив — с прямыми слэшами и латинскими именами, его распаковывает «Менеджер файлов» ispmanager.
$ErrorActionPreference = 'Stop'
$src = Split-Path $PSScriptRoot -Parent
$outRoot = Join-Path (Split-Path $src -Parent) 'для-хостинга'
$out = Join-Path $outRoot 'kolibri.clinic'
$zip = Join-Path $outRoot 'kolibri-site.zip'
$ver = Get-Date -Format 'yyyyMMddHHmm'
$utf8 = New-Object System.Text.UTF8Encoding $false

if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Force $out | Out-Null

# что выкладываем
$skipHtml = @('app-concept.html', 'rostomer.html')
Get-ChildItem $src -Filter '*.html' | Where-Object { $skipHtml -notcontains $_.Name } | ForEach-Object { Copy-Item $_.FullName $out }
foreach ($d in 'css', 'js', 'fonts', 'img', 'img\photos', 'form') { New-Item -ItemType Directory -Force (Join-Path $out $d) | Out-Null }
Copy-Item "$src\css\*.css" "$out\css"
Get-ChildItem "$src\js" -Filter '*.js' | Where-Object { $_.Name -ne 'rostomer.js' } | ForEach-Object { Copy-Item $_.FullName "$out\js" }
Copy-Item "$src\fonts\*.woff2", "$src\fonts\OFL-*.txt" "$out\fonts"
Copy-Item "$src\img\*.png" "$out\img"
Copy-Item "$src\img\photos\*.jpg" "$out\img\photos"
foreach ($f in 'send.php', 'lib.php', 'setup.php', 'config.example.php', '.htaccess') { Copy-Item (Join-Path "$src\form" $f) "$out\form" }
# config.php с почтой для заявок кладётся на сервер отдельно (если он уже есть локально — берём)
if (Test-Path "$src\form\config.php") { Copy-Item "$src\form\config.php" "$out\form" }

# правки для боевого сайта
$data = Join-Path $out 'js\data.js'
$t = [System.IO.File]::ReadAllText($data, [System.Text.Encoding]::UTF8)
if ($t -notmatch "formEndpoint: ''") { throw 'в data.js не найден formEndpoint' }
$t = $t.Replace("formEndpoint: ''", "formEndpoint: 'form/send.php'")
[System.IO.File]::WriteAllText($data, $t, $utf8)
$main = Join-Path $out 'js\main.js'
$t = [System.IO.File]::ReadAllText($main, [System.Text.Encoding]::UTF8)
$link = '<a href="app-concept.html" style="margin-right:16px">Концепция мобильного приложения</a>'
if (-not $t.Contains($link)) { throw 'в main.js не найдена ссылка на концепцию' }
[System.IO.File]::WriteAllText($main, $t.Replace($link, ''), $utf8)
foreach ($h in Get-ChildItem $out -Filter '*.html') {
    $t = [System.IO.File]::ReadAllText($h.FullName, [System.Text.Encoding]::UTF8)
    $t = [regex]::Replace($t, '(css/(style|fonts)\.css)(\?v=[0-9]+)?"', "`$1?v=$ver`"")
    $t = [regex]::Replace($t, '(js/(data|photos|main)\.js)(\?v=[0-9]+)?"', "`$1?v=$ver`"")
    [System.IO.File]::WriteAllText($h.FullName, $t, $utf8)
}
# версия для фото подставляется сама: main.js берёт её из своего адреса (?v=…)

# архив: прямые слэши в именах (Compress-Archive в PowerShell 5.1 пишет обратные — на Linux это ломается)
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
if (Test-Path $zip) { Remove-Item $zip -Force }
$fs = [System.IO.File]::Open($zip, 'CreateNew')
$za = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
$n = 0
foreach ($f in Get-ChildItem $out -Recurse -File -Force) {
    $name = $f.FullName.Substring($out.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($za, $f.FullName, $name, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    $n++
}
$za.Dispose(); $fs.Dispose()
"собрано: {0} файлов, архив {1:0.0} МБ, версия {2}" -f $n, ((Get-Item $zip).Length / 1MB), $ver
