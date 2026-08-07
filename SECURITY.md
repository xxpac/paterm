# Security

Paterm runs shells and reads/writes files, so security bugs matter. If you find one, please tell us before posting it publicly.

## Reporting

Email **security@paterm.app**. Include:

- What the issue is and what it lets an attacker do
- Steps to reproduce (a small PoC is great)
- Version, OS, arch

We'll get back to you within a few days. Once it's fixed, we'll credit you in the release notes - unless you'd rather stay anonymous.

Please **don't** open a public GitHub issue for security reports.

## Supported versions

Until `1.0.0`, only the latest minor gets security fixes. See the current version in `package.json` or on the [Releases page](https://github.com/xxpac/paterm/releases). 

## What's in scope

- The Rust backend in `src-tauri/` (PTY, FS, IPC, plugins)
- The frontend in `src/` - anywhere untrusted input lands (terminal output, file content)
- Release artifacts on GitHub and `paterm.app`
- The auto-updater

## What's not

- Bugs in upstream deps (Tauri, xterm.js, CodeMirror…) - report those upstream. We'll ship the fix once it's released.
- Anything that needs an already-compromised machine or a local attacker with shell access
- Older versions (`< 0.5`)

## What we do to keep things safe

- **No telemetry.** Paterm only talks to the network when you ask it to (update checks, web preview).
- **Workspace authorization.** Shell spawn and file-system commands are gated to directories you've authorized.
- **No Node in the renderer.** The frontend only reaches the host through the allow-listed Tauri commands.
- **Signed releases.** Updates are verified before they're applied.

## What we can't promise

- Paterm runs whatever you tell it to run, with your permissions. That's kind of the point of a terminal.
