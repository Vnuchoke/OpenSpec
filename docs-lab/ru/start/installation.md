# Установка

> Как установить, обновить и удалить CLI `openspec`.

## Установка CLI

На macOS или Linux выполните в терминале:

```bash
curl -fsSL https://openspec.dev/cli/install.sh | sh
```

В Windows выполните в PowerShell:

```powershell
irm https://openspec.dev/cli/install.ps1 | iex
```

Если установщик выведет строку `export PATH=...`, выполните её. Затем [проверьте установку](#проверка-установки).

## Установка с помощью ИИ-ассистента

Вставьте в чат с ассистентом:

```text
Fetch https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/install.md and follow it.
```

Или передайте тот же запрос агенту из терминала (здесь используется Claude Code):

```bash
curl -fsSL https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/install.md | claude
```

[Файл `install.md`](https://github.com/Fission-AI/OpenSpec/blob/main/install.md) содержит инструкцию для агента, который может выполнять команды. Ассистент сначала проверит, установлен ли CLI. Если CLI уже есть, он предложит обновить его тем же способом, которым он был установлен. Если CLI нет, ассистент покажет команду установки и дождётся подтверждения. npm используется только по вашему запросу или при сбое установщика; для установки через npm потребуется Node.js не ниже 22.20.0.

После установки ассистент проверит `PATH`, уточнит папку проекта и инструменты для интеграции, предложит запустить `openspec init` и сообщит, какие файлы созданы и как вызвать OpenSpec. Он не должен выполнять действия с повышенными правами или редактировать файлы запуска оболочки. Результат зависит от модели: если вы не готовы исправлять её ошибки, воспользуйтесь обычной установкой выше.

## Менеджеры пакетов

Для установки OpenSpec как пакета Node.js требуется версия 22.20.0 или новее. Homebrew и Nix поставляют собственную версию Node.js.

```bash
node --version
```

При подходящей версии установите пакет через npm:

```npm
npm install -g @fission-ai/openspec@latest
```

Если версия старее, обновите Node.js с [nodejs.org](https://nodejs.org) или через менеджер версий (`nvm`, `fnm`, `mise`) либо выберите [автономную установку](#установка-cli).

### Homebrew

```bash
brew install openspec
```

Формула доступна в [homebrew/core](https://formulae.brew.sh/formula/openspec); подключать отдельный tap не нужно.

### Yarn, pnpm и Bun

```bash
yarn global add @fission-ai/openspec
pnpm add -g @fission-ai/openspec
bun add -g @fission-ai/openspec
```

Выполните одну из команд. `yarn global` доступна только в Yarn Classic (1.x). Установка через Bun не отменяет требование к версии Node.js на `PATH`. Глобальный CLI можно установить другим менеджером пакетов, чем тот, что используется в проекте.

### Deno

```bash
deno install -g --allow-env --allow-read --allow-write --allow-run --allow-sys --allow-net npm:@fission-ai/openspec@latest
```

Для команд, запускающих другие программы (например, [`openspec config edit`](../../reference/cli.md)), Deno может запрашивать разрешение. Выдавайте разрешения только доверенному коду. Точную версию можно закрепить, например `npm:@fission-ai/openspec@^1.7.0`.

### Nix

Для окружения разработки проекта закрепите входной flake OpenSpec и используйте его пакет по умолчанию; см. [flake.nix](https://github.com/Fission-AI/OpenSpec/blob/main/flake.nix). Для разового запуска без установки:

```bash
nix run github:Fission-AI/OpenSpec -- --version
```

## Проверка установки

```bash
openspec --version
```

Если команда не найдена, убедитесь, что каталог с CLI есть в `PATH`, и откройте новый терминал. Далее [настройте проект](../../start/setup.md).

## Параметры установки

Чтобы выбрать версию или каталог, передайте переменную окружения установщику. На macOS и Linux:

```bash
curl -fsSL https://openspec.dev/cli/install.sh | OPENSPEC_VERSION=v1.15.0 sh
```

- `OPENSPEC_VERSION` — версия, например `v1.15.0`. По умолчанию ставится последний релиз.
- `OPENSPEC_INSTALL_DIR` — каталог установки. По умолчанию `~/.local/bin`, в Windows — `%LOCALAPPDATA%\Programs\openspec`.

В Windows сначала установите переменную в PowerShell:

```powershell
$env:OPENSPEC_VERSION = 'v1.15.0'
irm https://openspec.dev/cli/install.ps1 | iex
```

На Alpine Linux перед установкой выполните `apk add libstdc++ libgcc`.

### Ручная загрузка

1. Скачайте файл для своей ОС и архитектуры из [последнего релиза](https://github.com/Fission-AI/OpenSpec/releases/latest). Для macOS и Linux это `.tar.gz`, для Windows — `.zip`. Для Alpine выберите сборку с `linux-alpine` в имени. После выхода релиза файлы могут появиться не сразу.
2. Распакуйте архив, например `tar -xzf openspec-darwin-arm64.tar.gz`. В Windows используйте «Извлечь всё».
3. На macOS выполните `xattr -d com.apple.quarantine openspec` в каталоге распаковки.
4. Переместите бинарный файл в каталог из `PATH`, например `~/.local/bin`. В Windows переместите `openspec.exe` в такой каталог.

При желании проверьте загруженный архив через GitHub CLI:

```bash
gh attestation verify openspec-darwin-arm64.tar.gz --repo Fission-AI/OpenSpec
```

Команда завершится ошибкой, если файл собран не этим процессом релиза. Установщик уже сверяет контрольную сумму с `SHA256SUMS`, поэтому дополнительная проверка необязательна.

## Переход с npm на автономную установку

Переход необязателен. Настройки и проекты сохранятся, заменится только программа.

1. Запустите `openspec install`.
2. Выполните выведенную установщиком команду удаления старой копии. Например, для npm это `npm uninstall -g @fission-ai/openspec`. Старая копия может стоять раньше новой в `PATH`.
3. Откройте новый терминал и запустите `openspec version`. Для автономной установки вывод содержит `(standalone)`. Если он называет менеджер пакетов, найдите другую копию через `which -a openspec` (на Windows — `where.exe openspec`).

Повторно инициализировать проекты не нужно. Для возврата удалите автономный файл и заново установите пакет npm.

## Обновление

```bash
openspec update
```

Если доступна новая версия CLI, `openspec update` сообщит об этом. Для версии 2.1.0 и новее обновление CLI выполняется один раз на машине. При каждом запуске команда также обновляет навыки для указанной цели: глобально или в проекте.

> [!WARNING]
> Для обновления CLI используйте тот способ, которым его установили: `openspec install` для автономной установки, `npm install -g @fission-ai/openspec@latest` для npm или `brew upgrade openspec` для Homebrew. Для Deno повторите установку с `-f`; для Nix выполните `nix profile upgrade openspec`.

## Удаление

1. При наличии автодополнения выполните `openspec completion uninstall` до удаления CLI.
2. Удалите CLI: автономный файл — из каталога установки; пакет — через соответствующий менеджер (`npm uninstall -g @fission-ai/openspec`, `brew uninstall openspec`, `deno uninstall -g openspec` или `nix profile remove openspec`). Если каталог добавляли в `PATH` вручную, при необходимости уберите его.

Эти шаги не меняют код проектов. Если требуется удалить и сгенерированные материалы, отдельно проверьте глобальные навыки (`npx skills remove --global`), ссылки на навыки в каталогах интеграций (см. [поддерживаемые инструменты](../../reference/supported-tools.md)) и настройки пользователя (`~/.config/openspec/`, `~/.local/share/openspec/`). **Не удаляйте `openspec/` без отдельного решения:** в `specs/` и `changes/archive/` хранится история проекта.
