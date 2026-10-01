#!/usr/bin/env bash
# Публикация сайта на GitHub Pages: копирует файлы в git-копию, проставляет версию
# в адреса css/js (чтобы браузеры не держали старые файлы в кэше), коммитит и пушит.
# Запуск из Git Bash:  bash tools/publish.sh "Текст коммита"
set -e
SRC="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${KOLIBRI_REPO:-/c/Users/user/AppData/Local/Temp/claude/C--Users-user-Documents-Meta-Bitrix/8276e1ae-58d6-4d49-a588-f276692273d9/scratchpad/kolibri-site}"
MSG="${1:-Обновление сайта}"
VER="$(date +%Y%m%d%H%M)"
cp "$SRC"/*.html "$REPO/"
cp "$SRC"/css/*.css "$REPO/css/"
cp "$SRC"/js/*.js "$REPO/js/"
mkdir -p "$REPO/img/photos" && cp "$SRC"/img/*.png "$REPO/img/" && cp "$SRC"/img/photos/*.jpg "$REPO/img/photos/"
# версия в адресах стилей и скриптов
for f in "$REPO"/*.html; do
  sed -i -E "s#(css/style\.css)(\?v=[0-9]+)?\"#\1?v=$VER\"#g; s#(js/(data|photos|main|rostomer)\.js)(\?v=[0-9]+)?\"#\1?v=$VER\"#g" "$f"
done
cd "$REPO"
git add -A
git -c core.safecrlf=false commit -q -m "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" || { echo "нет изменений"; exit 0; }
GIT_TERMINAL_PROMPT=0 git push -q origin main
echo "опубликовано: версия $VER, коммит $(git log --oneline | head -1)"
