# Terminal renderer pool

This guide elaborates on `PATERM.md`. If anything here conflicts with `PATERM.md`, `PATERM.md` wins.

## Why a pool exists

Terminal tabs are kept mounted and hidden on switch so PTYs and dev servers keep streaming in the background. Creating an unbounded number of live xterm + WebGL renderer instances would blow the memory budget, so Paterm pools renderer slots.

The pool lives in `src/modules/terminal/lib/rendererPool.ts`.

## Slot lifecycle

- `POOL_MAX_SIZE` is 5 (`rendererPool.ts:22`). Each slot owns one xterm `Terminal`, `SearchAddon`, `SerializeAddon`, and optionally a `WebglAddon`.
- A slot is created on demand and assigned to a leaf on bind.
- `releaseSlot` detaches a slot from a leaf. If the leaf is idle, the slot is parked with `display:none` so xterm stops rendering but keeps parsing PTY bytes.
- After a grace period, idle slots may be reaped to keep the pool size down.

## Parking vs releasing

When a leaf becomes hidden:

1. `parkLeafSlot` sets the host to `display:none`. Rendering pauses but the live buffer keeps receiving bytes.
2. If the leaf is **busy** (foreground command, agent signal, alt-screen TUI, or block-shell running mode), it keeps the slot parked indefinitely.
3. If the leaf is **idle**, `releaseSlot` is called after `HIDDEN_RELEASE_DELAY_MS`. The slot's `currentLeafId` is cleared and `retainedLeafId` is set so the buffer stays live.

When the leaf becomes visible again, `acquireSlot` looks for:

1. A slot already bound to this leaf.
2. A retained slot for this leaf (`retainedLeafId === leafId`) - fast path, no snapshot replay.
3. A clean idle slot.
4. If the pool is at max size, the lowest-scoring slot is evicted. Eviction serializes the retained buffer to a snapshot via `SerializeAddon` before stealing the slot.

## The DormantRing

`src/modules/terminal/lib/dormantRing.ts` buffers PTY bytes for leaves that have no slot at all (stolen or never bound). It is capped at 1 MiB and drops oldest blocks on overflow. On drain it resumes from the next line boundary rather than resetting the terminal, so a mid-line escape sequence is not replayed from the middle.

## The never-serialize-mid-command invariant

This is the most important rule in the pool. A leaf that is in the middle of a command must **never** be serialized. Replaying incremental TUI repaints over a stale snapshot is what used to wipe Claude Code.

The code enforces this by checking `isLeafBusy` before eviction and by keeping slots parked (not released) while `commandRunning`, `isAgentActivePty`, or alt-screen is true.

## Fast path and snapshot replay

If a retained slot exists for a leaf, `bindSlot` skips `term.clear()` / `term.reset()` and simply drains the DormantRing into the live buffer. This avoids re-rendering a large snapshot.

If only a snapshot exists, `bindSlot` clears the terminal, resizes, writes the snapshot, then drains the ring. For alt-screen TUIs, the snapshot is skipped and a SIGWINCH kick is sent so the TUI repaints from scratch.

## WebGL lifecycle

WebGL addons are created when a slot becomes visible and reaped after a grace period when parked. The addon recovers from context loss on sleep/wake or GPU reset.

## Fitting the grid

`src/modules/terminal/lib/fit.ts` replaces `@xterm/addon-fit`. The upstream addon always subtracts an overlay-scrollbar lane (`overviewRuler?.width || 14`) from the available width, which cost roughly two columns per pane because Paterm hides that scrollbar in `globals.css`. `fitTerminal` measures the scrollbar element instead, so a hidden bar reserves nothing, and it declines to resize when the host is unmeasurable rather than collapsing the grid to the 2x1 minimum.

A fit is only correct against the cell of the renderer that will paint it. The WebGL renderer floors the char to whole device pixels (`Math.floor(charWidth * dpr)`) while the DOM renderer keeps it fractional, so at dpr 1 a 8.4 px measured char becomes an 8 px painted cell. `bindSlot` fits while WebGL is detached, so the grid must be refitted when the renderer swaps in, otherwise every fresh pane wraps several columns short of its right edge. `refitForRendererSwap` covers WebGL attach, WebGL dispose (`terminalWebglEnabled` off, which widens the cell and would overflow instead), unpark, and dpr changes from dragging the window to a display with different scaling. None of those change a CSS box, so the `ResizeObserver` never fires for them.

Every fit is followed by `resizePty` (debounced on the observer path) so the PTY winsize matches the grid. `poolSlotStats()` reports `cellWidth` and `deadPx` per slot; `deadPx` above one cell means a grid is fitted against a cell nobody is painting.

## Invariants

- Never allow the pool to grow without bound; max is `POOL_MAX_SIZE`.
- Never serialize or evict a leaf that is mid-command or in alt-screen.
- A hidden busy leaf keeps its live grid parked with `display:none`.
- An idle hidden leaf releases its slot but the buffer continues parsing bytes.
- The DormantRing only buffers bytes for leaves without any slot.
- A grid is always fitted against the active renderer's cell; a renderer or dpr change refits.

## See also

- [`PATERM.md`](../../PATERM.md) - the architecture source of truth
- [`docs/README.md`](../README.md) - index of contributor guides
- [PTY shell integration](pty-shell-integration.md) - sessions, OSC sequences, and ConPTY
