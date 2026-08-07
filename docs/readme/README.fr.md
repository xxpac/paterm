<div align="center">
  <img src="../../public/logo.png" width="144" height="144" alt="Paterm" />
  <h1>Paterm</h1>
  <p><strong>Espace de développement léger, axé sur le terminal.</strong></p>
  <p><a href="https://paterm.app">Site web</a> · <a href="https://paterm.app/docs">Documentation</a> · <a href="https://github.com/crynta/Paterm-website">Code source du site</a></p>

  <p>
    <img src="https://img.shields.io/github/v/release/crynta/paterm?label=version&color=blue" alt="version" />
    <img src="https://img.shields.io/github/downloads/crynta/paterm/total?label=downloads&color=blue" alt="téléchargements" />
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="plateforme" />
    <a href="https://discord.gg/tyveTUyEp7"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
    <a href="https://www.youtube.com/@crynta"><img src="https://img.shields.io/badge/Youtube-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  </p>
</div>

<p align="center">
  <a href="../../README.md">English</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.es.md">Español</a> | <a href="README.de.md">Deutsch</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.pt-BR.md">Português</a> | <a href="README.pl.md">Polski</a> | <a href="README.ru.md">Русский</a> | <a href="README.id.md">Bahasa Indonesia</a> | <a href="README.hi.md">हिन्दी</a>
</p>

---

Paterm est un environnement de développement léger, open source et axé sur le terminal, construit avec Tauri 2 + Rust et React 19. Il réunit un backend PTY natif avec moteur de rendu WebGL, un éditeur de code, un explorateur de fichiers et un panneau d'aperçu web. Environ 7-8 Mo sur le disque. Aucune télémétrie. Aucun compte.

## Captures d'écran

<table>
  <tr><td colspan="2" align="center"><img src="../terminal.png" alt="Terminal" style="border-radius: 4px;" /><br/><sub>Terminal WebGL par blocs avec panneau de saisie proche d'un éditeur</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../web-preview.png" alt="Aperçu web" style="margin-top: 12px;"/><br/><sub>Aperçu web des serveurs de développement locaux</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../themes.png" alt="Thèmes et image de fond" style="margin-top: 12px;"/><br/><sub>Thèmes personnalisés, préréglages et images de fond</sub></td></tr>
</table>

## Fonctionnalités

### Terminal

- xterm.js avec moteur WebGL, plusieurs onglets et flux en arrière-plan
- Terminal par blocs accéléré par GPU avec saisie de commandes proche d'un éditeur
- Backend PTY natif via `portable-pty` (zsh, bash, pwsh, fish, cmd)
- Panneaux divisés horizontalement et verticalement
- Recherche intégrée, détection des liens et couleurs vraies
- Glissez des fichiers depuis l'explorateur ou le bureau sous forme de chemins protégés pour le shell
- Environnements par onglet sous Windows (Local ou toute distribution WSL installée)
- Spaces restaure onglets, répertoires de travail et dispositions entre les lancements

### Éditeur de code

- CodeMirror 6, compatible avec les langages courants comme TS/JS, Rust, Python, Go, C/C++, Java, HTML/CSS, JSON et Markdown
- Serveurs de langage facultatifs avec diagnostics, navigation, complétion, formatage et serveurs personnalisés
- Markdown rendu et affichage des images, vidéos, fichiers audio et PDF
- Mode Vim
- Thèmes intégrés dont Kanagawa, Catppuccin, Rosé Pine, Everforest, Dracula, Solarized, Nord, Tokyo Night, GitHub et Xcode

### Explorateur de fichiers

- Thème d'icônes Catppuccin
- Recherche approximative, navigation au clavier, renommage intégré et actions contextuelles
- Mise à jour en direct lorsque les fichiers changent sur le disque

### Aperçu web

- Détecte les serveurs locaux et les ouvre dans un onglet d'aperçu
- Aperçu d'URL externes via une vue web enfant native

### Thèmes et personnalisation

- Créez des thèmes dans l'application et alternez entre les préréglages et les vôtres
- Partagez vos thèmes ou importez ceux de la communauté
- Images de fond avec opacité et flou réglables
- Le thème de l'éditeur est indépendant de celui de l'application

## Installation

Les installateurs récents sont disponibles sur la page [Releases](https://github.com/crynta/paterm/releases/latest). Paterm s'y met à jour automatiquement.

### Notes Windows

- Détection du shell : `pwsh.exe` (PowerShell 7+) -> `powershell.exe` (Windows PowerShell 5.1) -> `cmd.exe`.
- WSL est un environnement de travail à part entière, pas un sous-processus encapsulé.

### Notes Linux

- **Arch / AUR :** `yay -S paterm-bin` ou `paru`. Suit la dernière version.
- **NixOS / Nix :** utilisez le flake officiel avec `nix profile install github:crynta/paterm` hors NixOS. Sous NixOS, importez le flake et ajoutez `inputs.paterm.packages.${pkgs.system}.paterm` à `environment.systemPackages`. `nixosModules.paterm` offre aussi une configuration simplifiée.
- **AppImage :** nécessite FUSE. Sans FUSE : `./Paterm_*.AppImage --appimage-extract-and-run`. En cas de défauts sous Wayland, essayez `WEBKIT_DISABLE_DMABUF_RENDERER=1`. Les paquets `.deb` / `.rpm` utilisent la pile GTK du système et sont souvent plus fluides.

## Compiler depuis les sources

**Prérequis**

- Rust (stable), https://rustup.rs
- Node 20+ et [pnpm](https://pnpm.io)
- Prérequis Tauri pour votre plateforme, https://tauri.app/start/prerequisites/

**Exécution**

```bash
pnpm install
pnpm tauri dev          # développement
pnpm tauri build        # paquet de production
```

**Vérifications**

```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # lint Rust identique à la CI
cd src-tauri && cargo nextest run --locked                           # ou : cargo test --locked
```

## Technologies

Tauri 2, Rust, `portable-pty`, React 19, TypeScript, Vite, xterm.js, CodeMirror 6, Tailwind v4, shadcn/ui et Zustand.

## Contribuer

Les issues et PR sont les bienvenues. Signalez des problèmes, proposez des fonctionnalités ou envoyez une pull request. Consultez [CONTRIBUTING.md](../../CONTRIBUTING.md) et la [documentation d'architecture](../README.md).

## Licence

Paterm est distribué sous licence Apache-2.0. Pour plus d'informations sur les dépendances, consultez l'[Apache License 2.0](../../LICENSE).
