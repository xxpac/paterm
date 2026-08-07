<div align="center">
  <img src="../../public/logo.png" width="144" height="144" alt="Paterm" />
  <h1>Paterm</h1>
  <p><strong>Легковесная среда разработки с упором на терминал.</strong></p>
  <p><a href="https://paterm.app">Сайт</a> · <a href="https://paterm.app/docs">Документация</a> · <a href="https://github.com/crynta/Paterm-website">Исходный код сайта</a></p>

  <p>
    <img src="https://img.shields.io/github/v/release/xxpac/paterm?label=version&color=blue" alt="версия" />
    <img src="https://img.shields.io/github/downloads/xxpac/paterm/total?label=downloads&color=blue" alt="загрузки" />
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="платформа" />
    <a href="https://discord.gg/tyveTUyEp7"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
    <a href="https://www.youtube.com/@crynta"><img src="https://img.shields.io/badge/Youtube-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  </p>
</div>

<p align="center">
  <a href="../../README.md">English</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.es.md">Español</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.pt-BR.md">Português</a> | <a href="README.pl.md">Polski</a> | <a href="README.id.md">Bahasa Indonesia</a> | <a href="README.hi.md">हिन्दी</a>
</p>

---

Paterm представляет собой легковесную среду разработки с открытым исходным кодом, ориентированную на терминал. Она построена на Tauri 2 + Rust и React 19. В состав входят нативный PTY-бэкенд с WebGL-рендерером, редактор кода, файловый проводник и панель веб-предпросмотра. Около 7-8 МБ на диске. Без телеметрии. Без учётной записи.

## Снимки экрана

<table>
  <tr><td colspan="2" align="center"><img src="../terminal.png" alt="Терминал" style="border-radius: 4px;" /><br/><sub>Блочный WebGL-терминал с панелью ввода как в редакторе</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../web-preview.png" alt="Веб-предпросмотр" style="margin-top: 12px;"/><br/><sub>Предпросмотр локальных серверов разработки</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../themes.png" alt="Темы и фон" style="margin-top: 12px;"/><br/><sub>Пользовательские темы, пресеты и фоновые изображения</sub></td></tr>
</table>

## Возможности

### Терминал

- xterm.js с WebGL-рендерером, несколькими вкладками и фоновой передачей данных
- Блочный терминал с ускорением GPU и вводом команд как в редакторе
- Нативный PTY-бэкенд через `portable-pty` (zsh, bash, pwsh, fish, cmd)
- Горизонтальное и вертикальное разделение панелей
- Встроенный поиск, распознавание ссылок и True Color
- Перетаскивание файлов из проводника или с рабочего стола как безопасно заключённых в кавычки путей
- Отдельная среда для каждой вкладки в Windows (Local или установленный дистрибутив WSL)
- Spaces восстанавливает вкладки, рабочие каталоги и раскладку панелей между запусками

### Редактор кода

- CodeMirror 6 с поддержкой популярных языков, включая TS/JS, Rust, Python, Go, C/C++, Java, HTML/CSS, JSON и Markdown
- Опциональные языковые серверы с диагностикой, навигацией, дополнением, форматированием и пользовательскими серверами
- Рендеринг Markdown и просмотр изображений, видео, аудио и PDF
- Режим Vim
- Встроенные темы Kanagawa, Catppuccin, Rosé Pine, Everforest, Dracula, Solarized, Nord, Tokyo Night, GitHub, Xcode и другие

### Файловый проводник

- Тема значков Catppuccin
- Нечёткий поиск, навигация с клавиатуры, переименование на месте и контекстные действия
- Обновление в реальном времени при изменении файлов на диске

### Веб-предпросмотр

- Автоматически находит локальные серверы и открывает их во вкладке предпросмотра
- Показывает внешние URL через нативный дочерний WebView

### Темы и настройка

- Создание собственных тем в приложении и переключение между пресетами и своими темами
- Обмен темами и импорт из сообщества
- Фоновые изображения с регулируемой прозрачностью и размытием
- Тема редактора не зависит от темы приложения

## Установка

Последние установщики находятся на странице [Releases](https://github.com/xxpac/paterm/releases/latest). Paterm автоматически обновляется оттуда.

### Примечания для Windows

- Определение shell по умолчанию: `pwsh.exe` (PowerShell 7+) -> `powershell.exe` (Windows PowerShell 5.1) -> `cmd.exe`.
- WSL является полноценной рабочей средой, а не обёрнутым подпроцессом.

### Примечания для Linux

- **Arch / AUR:** `yay -S paterm-bin` или `paru`. Пакет следует за последним выпуском.
- **NixOS / Nix:** используйте официальный flake. Вне NixOS выполните `nix profile install github:xxpac/paterm`. В NixOS импортируйте flake и добавьте `inputs.paterm.packages.${pkgs.system}.paterm` в `environment.systemPackages`. Для более простой настройки доступен `nixosModules.paterm`.
- **AppImage:** требует FUSE. Без него выполните `./Paterm_*.AppImage --appimage-extract-and-run`. При проблемах рендеринга в Wayland попробуйте `WEBKIT_DISABLE_DMABUF_RENDERER=1`. Пакеты `.deb` / `.rpm` используют системный стек GTK и обычно работают плавнее.

## Сборка из исходного кода

**Требования**

- Rust (stable), https://rustup.rs
- Node 20+ и [pnpm](https://pnpm.io)
- Требования Tauri для вашей платформы, https://tauri.app/start/prerequisites/

**Запуск**

```bash
pnpm install
pnpm tauri dev          # разработка
pnpm tauri build        # производственный пакет
```

**Проверки**

```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # Rust lint как в CI
cd src-tauri && cargo nextest run --locked                           # или cargo test --locked
```

## Стек технологий

Tauri 2, Rust, `portable-pty`, React 19, TypeScript, Vite, xterm.js, CodeMirror 6, Tailwind v4, shadcn/ui и Zustand.

## Участие в разработке

Issues и PR приветствуются. Сообщайте о проблемах, предлагайте возможности или отправляйте pull request. Подробности находятся в [CONTRIBUTING.md](../../CONTRIBUTING.md) и [документации по архитектуре](../README.md).

## Лицензия

Paterm распространяется по лицензии Apache-2.0. Информацию о зависимостях см. в [Apache License 2.0](../../LICENSE).
