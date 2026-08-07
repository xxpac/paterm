# Paterm infrastructure follow-up

Every *internal* identifier and *reference* in the tree uses the **Paterm** name:
package/crate names, product name, window titles, runtime storage keys, IPC event
names, theme ids, CSS classes, docs, shell-integration env vars, and all
repo/website/package URLs.

The items below still need attention because they depend on **external resources**
(GitHub repo, website, package registries) that must be created or
configured under the new name. The code already points at these locations; they
just do not exist yet.

## 1. External resources to create

| Resource | Value referenced in code | Where |
| --- | --- | --- |
| GitHub repo | `xxpac/paterm` | `README.md` + `docs/readme/*.md` (badges, releases, flake install), `src/modules/updater/useUpdater.ts` (`GITHUB_LATEST_RELEASE`), `src-tauri/tauri.conf.json` (updater endpoint), `nix/package.nix`, `.github/workflows/*.yml`, `.github/ISSUE_TEMPLATE/*`, `ROADMAP.md`, `SECURITY.md`, `PATERM.md` |
| Website | `https://paterm.app` (+ `paterm.app/docs`) | `README.md` + `docs/readme/*.md`, `nix/package.nix` (`homepage`), `SECURITY.md` |
| Website source repo | `xxpac/Paterm-website` | `README.md` + `docs/readme/*.md` |
| Security contact email | `security@paterm.app` | `SECURITY.md` |
| AUR package | `paterm-bin` | `src/modules/updater/UpdaterDialog.tsx`, `README.md` + `docs/readme/*.md` |

Register each resource, then cut a release so the badges, updater, and flake
install resolve.

## 2. Auto-update

- The automatic update check is **disabled** (`useUpdater({ autoCheck: false })`
  in `src/modules/updater/UpdaterDialog.tsx`) because no releases exist yet under
  the repo.
- The manual **"Check for updates"** button in Settings → About queries the GitHub
  API endpoint for `xxpac/paterm`; it will not find releases until one is
  published.
- To re-enable: publish a signed release to `xxpac/paterm`, confirm the endpoints
  in `src-tauri/tauri.conf.json` (`plugins.updater.endpoints`) and
  `src/modules/updater/useUpdater.ts` (`GITHUB_LATEST_RELEASE`), then restore
  `useUpdater()` (drop `autoCheck: false`).
- The minisign updater public key in `tauri.conf.json` is a placeholder;
  regenerate it with the real signing key before shipping updates.

## 3. Bundle identifier / publisher

- Identifier is **`app.pac.paterm`** (`src-tauri/tauri.conf.json`, shown in
  Settings → About). The OS treats this as a distinct application: fresh app-data
  directory, autostart entry, window-state, etc.
- `publisher` / `copyright` in `src-tauri/tauri.conf.json` and `authors` in
  `src-tauri/Cargo.toml` now say **"xxpac"**. The identifier org segment is
  `pac`.

## 4. Local data reset (expected)

All runtime storage keys use the new name, so an existing local install starts
fresh:

- Store files: `paterm-settings.json`, `paterm-spaces.json`,
  `paterm-custom-themes.json`.
- localStorage keys (sidebar width/collapsed, updater last-check, theme/bg
  fast-path, palette MRU).
- IndexedDB database `paterm-bg-images`.
- Default theme id `paterm-default`; custom theme file extension `.paterm-theme`.

If preserving users' existing data ever matters, add a one-time migration on first
launch.

## 5. Rust lockfile (`src-tauri/Cargo.lock`)

- The root package entry is `paterm`; the rest of the lock is the committed
  baseline.
- The lock still contains dependencies from before earlier features were removed
  (e.g. `bytes`, `futures-util`, `keyring`, `reqwest`). Regenerate it in an
  environment that has the Tauri Linux build deps (`pkg-config`,
  `libwebkit2gtk-4.1-dev`, `libdbus-1-dev`, `libgtk-3-dev`, …):

  ```bash
  cd src-tauri && cargo generate-lockfile   # or: cargo build
  ```

  This prunes the unused crates. Until then, `cargo build --locked` reports the
  lockfile as out of date (a pre-existing condition from the feature-removal work).

## 6. Release artifacts & packaging

Artifact names follow the product name and binary:

- `Paterm_<ver>_amd64.deb`, `Paterm-<ver>-1.x86_64.rpm`, `Paterm_x64.app.tar.gz`,
  `Paterm_aarch64.app.tar.gz`, `Paterm_*.AppImage`, Windows `paterm.exe`, Linux
  `usr/bin/paterm`.
- `nix/package.nix` fetches these names from `xxpac/paterm`. They resolve once a
  release is cut under that repo.
- Windows artifacts (`Paterm_<ver>_x64-setup.exe`, `Paterm_<ver>_x64_en-US.msi`,
  and the `Paterm_<ver>_x64-portable.exe`) ship **unsigned** — no
  Authenticode/SignPath — so Windows shows a SmartScreen prompt on first run.
  macOS is notarized via the `APPLE_*` secrets, and the auto-updater still
  verifies the minisign `TAURI_SIGNING_PRIVATE_KEY`; both are unaffected.

## 7. Branding assets

- `src-tauri/icons/*` and `public/logo.png` are unchanged bitmap assets. Replace
  them if the new brand needs new artwork.
