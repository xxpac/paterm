<div align="center">
  <img src="../../public/logo.png" width="144" height="144" alt="Paterm" />
  <h1>Paterm</h1>
  <p><strong>Lekkie, terminalowe środowisko programistyczne.</strong></p>
  <p><a href="https://paterm.app">Strona</a> · <a href="https://paterm.app/docs">Dokumentacja</a> · <a href="https://github.com/crynta/Paterm-website">Kod źródłowy strony</a></p>

  <p>
    <img src="https://img.shields.io/github/v/release/crynta/paterm?label=version&color=blue" alt="wersja" />
    <img src="https://img.shields.io/github/downloads/crynta/paterm/total?label=downloads&color=blue" alt="pobrania" />
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="platforma" />
    <a href="https://discord.gg/tyveTUyEp7"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
    <a href="https://www.youtube.com/@crynta"><img src="https://img.shields.io/badge/Youtube-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  </p>
</div>

<p align="center">
  <a href="../../README.md">English</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.es.md">Español</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.pt-BR.md">Português</a> | <a href="README.ru.md">Русский</a> | <a href="README.id.md">Bahasa Indonesia</a> | <a href="README.hi.md">हिन्दी</a>
</p>

---

Paterm to lekkie, otwartoźródłowe, terminalowe środowisko programistyczne zbudowane na Tauri 2 + Rust i React 19. Zawiera natywny backend PTY z rendererem WebGL, a także edytor kodu, eksplorator plików i panel podglądu stron. Około 7-8 MB na dysku. Bez telemetrii. Bez konta.

## Zrzuty ekranu

<table>
  <tr><td colspan="2" align="center"><img src="../terminal.png" alt="Terminal" style="border-radius: 4px;" /><br/><sub>Blokowy terminal WebGL z panelem wprowadzania podobnym do edytora</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../web-preview.png" alt="Podgląd stron" style="margin-top: 12px;"/><br/><sub>Podgląd lokalnych serwerów deweloperskich</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../themes.png" alt="Motywy i tło" style="margin-top: 12px;"/><br/><sub>Własne motywy, ustawienia i obrazy tła</sub></td></tr>
</table>

## Funkcje

### Terminal

- xterm.js z rendererem WebGL, wieloma kartami i strumieniowaniem w tle
- Akcelerowany przez GPU terminal blokowy z wprowadzaniem poleceń jak w edytorze
- Natywny backend PTY przez `portable-pty` (zsh, bash, pwsh, fish, cmd)
- Panele dzielone poziomo i pionowo
- Wyszukiwanie w wierszu, wykrywanie linków i pełna paleta kolorów
- Przeciąganie plików z eksploratora lub pulpitu jako bezpiecznie cytowanych ścieżek powłoki
- Środowiska obszaru roboczego na kartę w Windows (Local lub dowolna dystrybucja WSL)
- Spaces przywraca karty, katalogi robocze i układy paneli między uruchomieniami

### Edytor kodu

- CodeMirror 6 obsługujący popularne języki, w tym TS/JS, Rust, Python, Go, C/C++, Java, HTML/CSS, JSON i Markdown
- Opcjonalne serwery językowe z diagnostyką, nawigacją, uzupełnianiem, formatowaniem i własnymi serwerami
- Renderowany Markdown oraz podgląd obrazów, wideo, audio i PDF
- Tryb Vim
- Wbudowane motywy, między innymi Kanagawa, Catppuccin, Rosé Pine, Everforest, Dracula, Solarized, Nord, Tokyo Night, GitHub i Xcode

### Eksplorator plików

- Motyw ikon Catppuccin
- Wyszukiwanie rozmyte, nawigacja klawiaturą, zmiana nazwy w miejscu i akcje kontekstowe
- Aktualizacja na żywo po zmianie plików na dysku

### Podgląd stron

- Automatyczne wykrywanie lokalnych serwerów i otwieranie ich na karcie podglądu
- Podgląd zewnętrznych URL w natywnym podrzędnym WebView

### Motywy i personalizacja

- Tworzenie motywów w aplikacji i przełączanie między ustawieniami a własnymi motywami
- Udostępnianie motywów lub importowanie ich od społeczności
- Obrazy tła z regulowaną przezroczystością i rozmyciem
- Motyw edytora jest niezależny od motywu aplikacji

## Instalacja

Najnowsze instalatory znajdują się na stronie [Releases](https://github.com/crynta/paterm/releases/latest). Paterm aktualizuje się stamtąd automatycznie.

### Uwagi dla Windows

- Domyślne wykrywanie powłoki: `pwsh.exe` (PowerShell 7+) -> `powershell.exe` (Windows PowerShell 5.1) -> `cmd.exe`.
- WSL jest pełnoprawnym środowiskiem obszaru roboczego, a nie opakowanym podprocesem.

### Uwagi dla Linux

- **Arch / AUR:** `yay -S paterm-bin` lub `paru`. Pakiet śledzi najnowsze wydanie.
- **NixOS / Nix:** użyj oficjalnego flake. Poza NixOS uruchom `nix profile install github:crynta/paterm`. W NixOS zaimportuj flake i dodaj `inputs.paterm.packages.${pkgs.system}.paterm` do `environment.systemPackages`. Dostępny jest też prostszy moduł `nixosModules.paterm`.
- **AppImage:** wymaga FUSE. Bez niego uruchom `./Paterm_*.AppImage --appimage-extract-and-run`. Przy błędach renderowania w Wayland spróbuj `WEBKIT_DISABLE_DMABUF_RENDERER=1`. Pakiety `.deb` / `.rpm` korzystają z systemowego GTK i zwykle działają płynniej.

## Budowanie ze źródeł

**Wymagania**

- Rust (stable), https://rustup.rs
- Node 20+ i [pnpm](https://pnpm.io)
- Wymagania Tauri dla platformy, https://tauri.app/start/prerequisites/

**Uruchamianie**

```bash
pnpm install
pnpm tauri dev          # środowisko deweloperskie
pnpm tauri build        # pakiet produkcyjny
```

**Kontrole**

```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # lint Rust zgodny z CI
cd src-tauri && cargo nextest run --locked                           # lub cargo test --locked
```

## Stos technologiczny

Tauri 2, Rust, `portable-pty`, React 19, TypeScript, Vite, xterm.js, CodeMirror 6, Tailwind v4, shadcn/ui i Zustand.

## Współtworzenie

Zgłoszenia i PR są mile widziane. Zgłaszaj problemy, proponuj funkcje lub wysyłaj pull requesty. Więcej informacji zawierają [CONTRIBUTING.md](../../CONTRIBUTING.md) i [dokumentacja architektury](../README.md).

## Licencja

Paterm jest objęty licencją Apache-2.0. Informacje o zależnościach znajdziesz w [Apache License 2.0](../../LICENSE).
