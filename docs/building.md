# Building Paterm: packages & portables

Paterm is a [Tauri 2](https://tauri.app) app. `pnpm tauri build` compiles the Rust
backend and the Vite frontend, then bundles OS-native installers and portable
artifacts.

**Golden rule: build each platform's artifacts _on_ that platform.** Tauri does
not cross-build installers — Windows installers are produced on Windows, `.dmg`
on macOS, `.deb`/`.rpm`/`.AppImage` on Linux. (macOS is the one exception that can
target both Intel and Apple Silicon from one machine.)

| Platform | Installers / packages | "Portable" (no install) |
| --- | --- | --- |
| Windows | `.exe` (NSIS), `.msi` | standalone `paterm.exe` |
| macOS | `.dmg` | `Paterm.app` bundle |
| Linux | `.deb`, `.rpm` | `.AppImage` (and the raw `paterm` binary) |

---

## 0. Common prerequisites (all platforms)

- **Rust (stable)** via [rustup](https://rustup.rs).
- **Node 22 or newer** (CI builds on Node 24).
- **pnpm** — the repo pins a version via `packageManager`, so the easiest path is:

```bash
corepack enable
```

- Your platform's [Tauri prerequisites](https://tauri.app/start/prerequisites/)
  (details per-OS below).

Then, from the repo root:

```bash
pnpm install
```

`pnpm tauri build` runs the frontend build (`tsc && vite build`) automatically via
`beforeBuildCommand`, so you do not need to build the frontend separately.

---

## 1. Read first: the updater signing key

`src-tauri/tauri.conf.json` sets `bundle.createUpdaterArtifacts: true` **and** ships
an updater `pubkey`. Because of this, a plain `pnpm tauri build` that reaches the
bundling step will **fail** with an error about a missing signing private key.

You have three ways to deal with it:

### Option A — portable binary only (simplest, no key needed)

`--no-bundle` skips bundling entirely, so no updater artifacts are produced and no
key is required. This is the fastest way to "just get a runnable build":

```bash
pnpm tauri build --no-bundle
```

Output: `src-tauri/target/release/paterm` (or `paterm.exe` on Windows). See the
per-OS notes for runtime requirements.

### Option B — installers without updater artifacts (no key needed)

Override the config to turn updater artifacts off for this build. Create a small
file `build-local.json` anywhere in the repo (you can delete it afterwards):

```json
{ "bundle": { "createUpdaterArtifacts": false } }
```

Then pass it with `-c` (works the same in bash, zsh, and PowerShell):

```bash
pnpm tauri build -c build-local.json
```

### Option C — full build with updater artifacts (mirrors CI)

Generate a local signing key once and export it. `.env` files are **not** read —
you must export the variables in your shell.

```bash
# bash / zsh
pnpm tauri signer generate -w "$HOME/.paterm-updater.key"
export TAURI_SIGNING_PRIVATE_KEY="$HOME/.paterm-updater.key"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""   # set if you gave the key a password
```

```powershell
# Windows PowerShell
pnpm tauri signer generate -w "$env:USERPROFILE\.paterm-updater.key"
$env:TAURI_SIGNING_PRIVATE_KEY = "$env:USERPROFILE\.paterm-updater.key"
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = ""
```

> A locally generated key will **not** match the `pubkey` in `tauri.conf.json`, so
> updates signed with it won't validate against official releases. That's fine for
> building/testing your own packages — see
> [`paterm-infrastructure.md`](paterm-infrastructure.md) for the auto-update
> follow-up.

`--no-sign` is a separate flag that skips **OS** code signing (Authenticode / Apple),
not updater signing.

The examples below use **Option B** (`-c build-local.json`). Drop that flag if you
are using Option C.

---

## 2. Windows (build on Windows)

**Prerequisites**

- **Microsoft C++ Build Tools** — install "Visual Studio Build Tools" and select
  the **"Desktop development with C++"** workload (MSVC compiler + Windows SDK).
  Rust's default toolchain here is `x86_64-pc-windows-msvc` and needs this.
- **Rust** (rustup), **Node 22+**, **pnpm** (`corepack enable`).
- **WebView2 runtime** — preinstalled on Windows 11 and most Windows 10. The NSIS
  installer will download it at install time if missing (`downloadBootstrapper`).
- First bundle downloads **NSIS** and **WiX** (for the `.msi`) automatically, so an
  internet connection is required the first time.

**Installers (`.exe` + `.msi`)**

```powershell
pnpm tauri build -c build-local.json
```

Outputs:

- `src-tauri\target\release\bundle\nsis\Paterm_0.1.0_x64-setup.exe`
- `src-tauri\target\release\bundle\msi\Paterm_0.1.0_x64_en-US.msi`

Build just one type with `-b`:

```powershell
pnpm tauri build -b nsis -c build-local.json   # NSIS .exe only
pnpm tauri build -b msi  -c build-local.json   # MSI only
```

**Portable `.exe` (no installer)**

```powershell
pnpm tauri build --no-bundle
```

Copy `src-tauri\target\release\paterm.exe` anywhere and run it. It relies on the
system WebView2 runtime (present on modern Windows), so it is "portable" but not a
fully self-contained single file.

**ARM64 (optional):**

```powershell
rustup target add aarch64-pc-windows-msvc
pnpm tauri build --target aarch64-pc-windows-msvc -c build-local.json
```

---

## 3. macOS (build on macOS)

**Prerequisites**

- **Xcode Command Line Tools:** `xcode-select --install`.
- **Rust** (rustup), **Node 22+**, **pnpm** (`corepack enable`).
- For universal / cross-arch builds:

```bash
rustup target add aarch64-apple-darwin x86_64-apple-darwin
```

**`.dmg` + `.app` for your Mac's architecture**

```bash
pnpm tauri build -c build-local.json
```

**Universal build (runs on Intel + Apple Silicon)**

```bash
pnpm tauri build --target universal-apple-darwin -c build-local.json
```

You can also pick a single arch with `--target x86_64-apple-darwin` or
`--target aarch64-apple-darwin`.

Outputs (host-arch build):

- `src-tauri/target/release/bundle/dmg/Paterm_0.1.0_aarch64.dmg` (arch suffix varies)
- `src-tauri/target/release/bundle/macos/Paterm.app`

When you pass `--target <triple>`, the outputs move under
`src-tauri/target/<triple>/release/bundle/...` (e.g.
`src-tauri/target/universal-apple-darwin/release/bundle/dmg/`).

**Portable:** `Paterm.app` is drag-to-run — no installer needed. Because a local
build is unsigned, Gatekeeper will complain on first launch; right-click → **Open**,
or clear the quarantine attribute:

```bash
xattr -dr com.apple.quarantine "src-tauri/target/release/bundle/macos/Paterm.app"
```

Add `--no-sign` to skip code signing explicitly.

---

## 4. Linux (build on Linux)

Build on the **oldest** distribution you want to support — glibc and the bundled
webkit determine how portable the result is. CI uses **Ubuntu 22.04**.

**Prerequisites (Debian / Ubuntu)** — matches CI:

```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  librsvg2-dev \
  libssl-dev \
  patchelf \
  build-essential curl wget file
```

For Fedora, Arch, etc., see the [Tauri Linux prerequisites](https://tauri.app/start/prerequisites/#linux).

**`.deb` + `.rpm` + `.AppImage`**

```bash
pnpm tauri build -c build-local.json
```

Outputs:

- `src-tauri/target/release/bundle/deb/Paterm_0.1.0_amd64.deb`
- `src-tauri/target/release/bundle/rpm/Paterm-0.1.0-1.x86_64.rpm`
- `src-tauri/target/release/bundle/appimage/Paterm_0.1.0_amd64.AppImage`

Build a single type with `-b deb` / `-b rpm` / `-b appimage`. The AppImage step
downloads `linuxdeploy` on first run (needs internet).

**Portable:** the `.AppImage` is the portable format:

```bash
chmod +x src-tauri/target/release/bundle/appimage/Paterm_0.1.0_amd64.AppImage
./src-tauri/target/release/bundle/appimage/Paterm_0.1.0_amd64.AppImage
```

- Needs FUSE. Without it: append `--appimage-extract-and-run`.
- Wayland rendering glitches: `WEBKIT_DISABLE_DMABUF_RENDERER=1 ./Paterm_*.AppImage`.
- The raw binary `src-tauri/target/release/paterm` also runs directly but relies on
  the system `webkit2gtk` being installed.

> The release workflow strips a few bundled `libwayland-*` libs from the AppImage
> and re-signs it (see `.github/workflows/release.yml`). That is a
> release-only refinement for broad Mesa compatibility; a locally built AppImage
> runs fine on the build machine and newer systems without it.

---

## 5. Output location cheat-sheet

Default (host target):

```
src-tauri/target/release/
├─ paterm[.exe]                         # raw binary (Option A / --no-bundle)
└─ bundle/
   ├─ nsis/     Paterm_<ver>_x64-setup.exe
   ├─ msi/      Paterm_<ver>_x64_en-US.msi
   ├─ dmg/      Paterm_<ver>_<arch>.dmg
   ├─ macos/    Paterm.app
   ├─ deb/      Paterm_<ver>_amd64.deb
   ├─ rpm/      Paterm-<ver>-1.x86_64.rpm
   └─ appimage/ Paterm_<ver>_amd64.AppImage
```

With `--target <triple>`, replace `target/release/` with `target/<triple>/release/`.

Artifact names come from `productName` ("Paterm") and `version`. To change the
version, bump it in **all three**: `package.json`, `src-tauri/tauri.conf.json`, and
`src-tauri/Cargo.toml`.

---

## 6. Useful flags

| Flag | Effect |
| --- | --- |
| `--no-bundle` | Compile only; produce the raw binary, skip installers (no signing key needed). |
| `-b, --bundles <list>` | Build only specific bundles: `nsis`, `msi`, `app`, `dmg`, `deb`, `rpm`, `appimage`. |
| `--target <triple>` | Cross-arch build (e.g. `universal-apple-darwin`, `aarch64-pc-windows-msvc`). |
| `--debug` | Debug build — faster to compile, larger, unoptimized. Output under `target/debug/`. |
| `-c, --config <json\|path>` | Merge extra config (used here to disable updater artifacts). |
| `--no-sign` | Skip OS code signing (Authenticode / Apple). |
| `-v` / `-vv` | Verbose / very verbose build logs. |

Example — a quick, unsigned, single-bundle debug build:

```bash
pnpm tauri build --debug -b nsis -c build-local.json
```

---

## 7. Troubleshooting

- **"...updater... private key" / signing error** → you hit the updater-artifact
  requirement from [section 1](#1-read-first-the-updater-signing-key). Use `--no-bundle`,
  `-c build-local.json`, or export a signing key.
- **Windows: `link.exe`/`cl.exe` not found** → install the "Desktop development with
  C++" workload in Visual Studio Build Tools.
- **Windows: app opens to a blank/white window** → the WebView2 runtime is missing;
  install the Evergreen WebView2 runtime.
- **Linux: `webkit2gtk`/`pkg-config`/`glib` not found** → install the dev packages in
  [section 4](#4-linux-build-on-linux).
- **`cargo ... --locked` reports the lockfile is out of date** → the committed
  `src-tauri/Cargo.lock` is stale after earlier feature removal. `pnpm tauri build`
  runs cargo **without** `--locked`, so it regenerates the lock and builds fine. To
  refresh the lock explicitly: `cd src-tauri && cargo generate-lockfile`. See
  [`paterm-infrastructure.md`](paterm-infrastructure.md) §5.
- **First build hangs on a download** → the first bundle fetches NSIS/WiX (Windows)
  or linuxdeploy (Linux AppImage). It needs network access; a fully offline machine
  can compile with `--no-bundle` but cannot produce installers on the first run.

---

See also: [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the dev workflow and the
quality-bar checks (`pnpm lint` / `check-types` / `test`, `cargo clippy`, `cargo test`).
