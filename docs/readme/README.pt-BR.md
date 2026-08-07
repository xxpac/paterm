<div align="center">
  <img src="../../public/logo.png" width="144" height="144" alt="Paterm" />
  <h1>Paterm</h1>
  <p><strong>Workspace de desenvolvimento leve, focado no terminal.</strong></p>
  <p><a href="https://paterm.app">Site</a> · <a href="https://paterm.app/docs">Documentação</a> · <a href="https://github.com/crynta/Paterm-website">Código-fonte do site</a></p>

  <p>
    <img src="https://img.shields.io/github/v/release/xxpac/paterm?label=version&color=blue" alt="versão" />
    <img src="https://img.shields.io/github/downloads/xxpac/paterm/total?label=downloads&color=blue" alt="downloads" />
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="plataforma" />
    <a href="https://discord.gg/tyveTUyEp7"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
    <a href="https://www.youtube.com/@crynta"><img src="https://img.shields.io/badge/Youtube-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  </p>
</div>

<p align="center">
  <a href="../../README.md">English</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.es.md">Español</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.pl.md">Polski</a> | <a href="README.ru.md">Русский</a> | <a href="README.id.md">Bahasa Indonesia</a> | <a href="README.hi.md">हिन्दी</a>
</p>

---

Paterm é um ambiente de desenvolvimento leve, de código aberto e focado no terminal, criado com Tauri 2 + Rust e React 19. Inclui backend PTY nativo com renderizador WebGL, além de editor de código, explorador de arquivos e painel de visualização web. Cerca de 7-8 MB em disco. Sem telemetria. Sem conta.

## Capturas de tela

<table>
  <tr><td colspan="2" align="center"><img src="../terminal.png" alt="Terminal" style="border-radius: 4px;" /><br/><sub>Terminal WebGL baseado em blocos com painel de entrada semelhante a um editor</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../web-preview.png" alt="Visualização web" style="margin-top: 12px;"/><br/><sub>Visualização de servidores de desenvolvimento locais</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../themes.png" alt="Temas e imagem de fundo" style="margin-top: 12px;"/><br/><sub>Temas personalizados, predefinições e imagens de fundo</sub></td></tr>
</table>

## Recursos

### Terminal

- xterm.js com renderizador WebGL, várias abas e transmissão em segundo plano
- Terminal baseado em blocos e acelerado por GPU com entrada semelhante a um editor
- Backend PTY nativo via `portable-pty` (zsh, bash, pwsh, fish, cmd)
- Painéis divididos na horizontal e vertical
- Busca integrada, detecção de links e cores reais
- Arraste arquivos do explorador ou desktop como caminhos com escape seguro para o shell
- Ambientes por aba no Windows (Local ou qualquer distribuição WSL instalada)
- Spaces restaura abas, diretórios e layouts divididos entre inicializações

### Editor de código

- CodeMirror 6, compatível com linguagens populares como TS/JS, Rust, Python, Go, C/C++, Java, HTML/CSS, JSON e Markdown
- Servidores de linguagem opcionais com diagnósticos, navegação, conclusão, formatação e servidores personalizados
- Markdown renderizado e visualização de imagens, vídeos, áudio e PDF
- Modo Vim
- Temas integrados como Kanagawa, Catppuccin, Rosé Pine, Everforest, Dracula, Solarized, Nord, Tokyo Night, GitHub e Xcode

### Explorador de arquivos

- Tema de ícones Catppuccin
- Busca aproximada, navegação por teclado, renomeação integrada e ações de contexto
- Atualizações ao vivo quando arquivos mudam no disco

### Visualização web

- Detecta servidores locais e os abre em uma aba de visualização
- Visualiza URLs externas por uma webview filha nativa

### Temas e personalização

- Crie temas no aplicativo e alterne entre predefinições e temas próprios
- Compartilhe temas ou importe-os da comunidade
- Imagens de fundo com opacidade e desfoque ajustáveis
- O tema do editor é independente do tema do aplicativo

## Instalação

Os instaladores mais recentes estão na página de [Releases](https://github.com/xxpac/paterm/releases/latest). O Paterm se atualiza automaticamente por ela.

### Notas para Windows

- Detecção de shell: `pwsh.exe` (PowerShell 7+) -> `powershell.exe` (Windows PowerShell 5.1) -> `cmd.exe`.
- WSL é um ambiente de workspace de primeira classe, não um subprocesso encapsulado.

### Notas para Linux

- **Arch / AUR:** `yay -S paterm-bin` ou `paru`. Acompanha a versão mais recente.
- **NixOS / Nix:** use o flake oficial com `nix profile install github:xxpac/paterm` fora do NixOS. No NixOS, importe o flake e adicione `inputs.paterm.packages.${pkgs.system}.paterm` a `environment.systemPackages`. `nixosModules.paterm` também oferece uma configuração simplificada.
- **AppImage:** requer FUSE. Sem ele: `./Paterm_*.AppImage --appimage-extract-and-run`. Em caso de falhas no Wayland, tente `WEBKIT_DISABLE_DMABUF_RENDERER=1`. Os pacotes `.deb` / `.rpm` usam a pilha GTK do sistema e costumam ser mais suaves.

## Compilar do código-fonte

**Pré-requisitos**

- Rust (stable), https://rustup.rs
- Node 20+ e [pnpm](https://pnpm.io)
- Pré-requisitos do Tauri para sua plataforma, https://tauri.app/start/prerequisites/

**Executar**

```bash
pnpm install
pnpm tauri dev          # desenvolvimento
pnpm tauri build        # pacote de produção
```

**Verificações**

```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # lint Rust igual ao CI
cd src-tauri && cargo nextest run --locked                           # ou: cargo test --locked
```

## Tecnologias

Tauri 2, Rust, `portable-pty`, React 19, TypeScript, Vite, xterm.js, CodeMirror 6, Tailwind v4, shadcn/ui e Zustand.

## Como contribuir

Issues e PRs são bem-vindos. Relate problemas, sugira recursos ou envie pull requests. Consulte [CONTRIBUTING.md](../../CONTRIBUTING.md) e a [documentação de arquitetura](../README.md).

## Licença

Paterm é licenciado sob a Apache-2.0. Para informações sobre dependências, consulte a [Apache License 2.0](../../LICENSE).
