<div align="center">
  <img src="../../public/logo.png" width="144" height="144" alt="Paterm" />
  <h1>Paterm</h1>

  <p><strong>Leichtgewichtiger, terminalorientierter Entwicklungsarbeitsbereich.</strong></p>

  <p>
    <a href="https://paterm.app">Website</a> ·
    <a href="https://paterm.app/docs">Dokumentation</a> ·
    <a href="https://github.com/crynta/Paterm-website">Quellcode der Website</a>
  </p>

  <p>
    <img src="https://img.shields.io/github/v/release/crynta/paterm?label=version&color=blue" alt="Version" />
    <img src="https://img.shields.io/github/downloads/crynta/paterm/total?label=downloads&color=blue" alt="Downloads" />
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="Plattform" />
    <a href="https://discord.gg/tyveTUyEp7"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
    <a href="https://www.youtube.com/@crynta"><img src="https://img.shields.io/badge/Youtube-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  </p>
</div>

<p align="center">
  <a href="../../README.md">English</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.pt-BR.md">Português</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.id.md">Bahasa Indonesia</a> |
  <a href="README.hi.md">हिन्दी</a>
</p>

---

Paterm ist eine leichtgewichtige, quelloffene und terminalorientierte Entwicklungsumgebung, die auf Tauri 2 + Rust und React 19 basiert. Sie bietet ein natives PTY-Backend mit WebGL-Renderer sowie einen Code-Editor, Datei-Explorer und eine integrierte Webvorschau. Etwa 7-8 MB auf der Festplatte. Keine Telemetrie. Kein Konto.

## Screenshots

<table>
  <tr>
    <td colspan="2" align="center"><img src="../terminal.png" alt="Terminal" style="border-radius: 4px;" /><br/><sub>Blockbasiertes WebGL-Terminal mit editorähnlichem Eingabebereich</sub></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="../web-preview.png" alt="Webvorschau" style="margin-top: 12px;"/><br/><sub>Webvorschau lokaler Entwicklungsserver</sub></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="../themes.png" alt="Themes und Hintergrundbild" style="margin-top: 12px;"/><br/><sub>Eigene Themes, Voreinstellungen und Hintergrundbilder</sub></td>
  </tr>
</table>

## Funktionen

### Terminal

- xterm.js mit WebGL-Renderer, mehreren Tabs und Hintergrund-Streaming
- GPU-beschleunigtes blockbasiertes Terminal mit editorähnlicher Befehlseingabe
- Natives PTY-Backend über `portable-pty` (zsh, bash, pwsh, fish, cmd)
- Horizontal und vertikal geteilte Bereiche
- Integrierte Suche, Linkerkennung und True Color
- Dateien aus Explorer oder Desktop als Shell-sicher quotierte Pfade in ein Terminal ziehen
- Arbeitsumgebungen pro Tab unter Windows (Lokal oder jede installierte WSL-Distribution)
- Spaces stellt Tabs, Arbeitsverzeichnisse und geteilte Layouts nach einem Neustart wieder her

### Code-Editor

- CodeMirror 6 (unterstützt alle verbreiteten Sprachen wie TS/JS, Rust, Python, Go, C/C++, Java, HTML/CSS, JSON, Markdown usw.)
- Optionale Language-Server-Unterstützung mit Diagnosen, Navigation, Vervollständigung, Formatierung und eigenen Servern
- Gerendertes Markdown sowie Anzeige von Bildern, Videos, Audio und PDF
- Vim-Modus
- Integrierte Editor-Themes wie Kanagawa, Catppuccin, Rosé Pine, Everforest, Dracula, Solarized, Nord, Tokyo Night, GitHub und Xcode

### Datei-Explorer

- Catppuccin-Icon-Theme
- Unscharfe Suche, Tastaturnavigation, direktes Umbenennen und Kontextaktionen
- Live-Aktualisierung bei Dateiänderungen auf der Festplatte

### Webvorschau

- Erkennt lokale Entwicklungsserver automatisch und öffnet sie in einem Vorschau-Tab
- Vorschau externer URLs über eine native untergeordnete Webview

### Themes und Anpassung

- Eigene Themes in der App erstellen und zwischen integrierten Vorgaben und eigenen Themes wechseln
- Themes teilen oder aus der Community importieren
- Hintergrundbilder mit einstellbarer Deckkraft und Unschärfe
- Das Editor-Theme ist unabhängig vom App-Theme

## Installation

Die neuesten Installationspakete stehen auf der Seite [Releases](https://github.com/crynta/paterm/releases/latest). Paterm aktualisiert sich von dort automatisch.

### Hinweise für Windows

- Standardmäßige Shell-Erkennung: `pwsh.exe` (PowerShell 7+) -> `powershell.exe` (Windows PowerShell 5.1) -> `cmd.exe`.
- WSL ist eine vollwertige Arbeitsumgebung und kein umschlossener Unterprozess.

### Hinweise für Linux

- **Arch / AUR:** `yay -S paterm-bin` (oder `paru` usw.). Folgt der neuesten Version.
- **NixOS / Nix:** Nutze den offiziellen Flake: `nix profile install github:crynta/paterm` außerhalb von NixOS. Unter NixOS importierst du den Flake und fügst `inputs.paterm.packages.${pkgs.system}.paterm` zu `environment.systemPackages` hinzu. Für eine einfachere Einrichtung ist auch `nixosModules.paterm` verfügbar.
- **AppImage:** Benötigt FUSE. Ohne FUSE: `./Paterm_*.AppImage --appimage-extract-and-run`. Bei Darstellungsfehlern unter Wayland hilft möglicherweise `WEBKIT_DISABLE_DMABUF_RENDERER=1`. Die `.deb`- / `.rpm`-Pakete binden stattdessen den GTK-Stack des Systems ein und laufen meist flüssiger.

## Aus dem Quellcode bauen

**Voraussetzungen**

- Rust (stable), https://rustup.rs
- Node 20+ und [pnpm](https://pnpm.io)
- Tauri-Voraussetzungen für deine Plattform, https://tauri.app/start/prerequisites/

**Ausführen**

```bash
pnpm install
pnpm tauri dev          # Entwicklung
pnpm tauri build        # Produktionspaket
```

**Prüfungen**

```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # Rust-Lint wie in CI
cd src-tauri && cargo nextest run --locked                           # oder: cargo test --locked
```

## Technologie-Stack

Tauri 2, Rust, `portable-pty`, React 19, TypeScript, Vite, xterm.js, CodeMirror 6, Tailwind v4, shadcn/ui und Zustand.

## Mitwirken

Issues und PRs sind willkommen. Melde Probleme, schlage Funktionen vor oder reiche Pull Requests ein. Weitere Informationen findest du in [CONTRIBUTING.md](../../CONTRIBUTING.md) und der [Architekturdokumentation](../README.md).

## Lizenz

Paterm steht unter der Apache-2.0-Lizenz. Weitere Informationen zu unseren Abhängigkeiten findest du in der [Apache License 2.0](../../LICENSE).
