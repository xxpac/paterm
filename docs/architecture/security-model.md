# Security model

This guide elaborates on `PATERM.md`. If anything here conflicts with `PATERM.md`, `PATERM.md` wins.

Paterm runs shells and reads and writes files on your behalf. The security model is defense-in-depth: no single guard is enough, so every boundary validates input before acting on it.

## Boundaries

The main trust boundaries are:

1. **IPC boundary** - commands registered in `src-tauri/src/lib.rs`, gated by `src-tauri/capabilities/default.json`.
2. **Spawn / file-system boundary** - PTY spawn and file-system commands go through the workspace authorization registry.
3. **Terminal escape-sequence boundary** - OSC sequences are parsed and acted on, but never blindly trusted to mutate state.
4. **Preview boundary** - the web preview renders in a separate, sandboxed webview surface, not the app's privileged context.

## Workspace authorization registry

`WorkspaceRegistry` (`src-tauri/src/modules/workspace.rs:20`) tracks directories that PTY spawn and file-system commands are allowed to operate in.

- `workspace_authorize` adds a directory.
- `authorize_spawn_cwd` rejects a spawn cwd outside an authorized root.
- `authorize_user_spawn_cwd` registers the user's chosen cwd as a new root instead of rejecting it.
- The registry is bootstrapped with the launch directory and the user's home directory (`workspace.rs:135`).

This is the allow side of the file-system boundary. Any new feature that spawns a shell or mutates files outside the current workspace must interact with this registry.

## OSC trust gating

The terminal parses OSC sequences from the PTY byte stream:

- **OSC 7** updates the tab cwd.
- **OSC 133 A/B/C/D** marks prompt/command boundaries.

These are driven **only by OSC sequences**, never by raw output, so a repainting TUI never causes state to flap. Sequences are validated before they are allowed to mutate tab state (cwd, prompt markers), never executed by the renderer.

## Invariants

- New file-system-touching or shell-spawning commands must respect the workspace authorization registry.
- New plugin APIs must be added to `src-tauri/capabilities/default.json`.
- Untrusted input (terminal escape sequences, file content) is validated in Rust or in carefully scoped frontend code, never executed by the renderer.

## See also

- [`PATERM.md`](../../PATERM.md) - the architecture source of truth
- [`docs/README.md`](../README.md) - index of contributor guides
- [Two-process model](two-process-model.md) - IPC boundary and command catalog
- [PTY shell integration](pty-shell-integration.md) - OSC parsing and shell integration
