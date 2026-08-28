import type { Terminal } from "@xterm/xterm";

const MIN_COLS = 2;
const MIN_ROWS = 1;

export type FitMetrics = {
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;
};

export type FitDims = { cols: number; rows: number };

// Null (not the minimum grid) when nothing can be measured: an unmeasurable
// pane must keep its grid rather than reflow the buffer through 2x1.
export function computeFitDims(m: FitMetrics): FitDims | null {
  if (!(m.cellWidth > 0) || !(m.cellHeight > 0)) return null;
  if (!(m.width > 0) || !(m.height > 0)) return null;
  return {
    cols: Math.max(MIN_COLS, Math.floor(m.width / m.cellWidth)),
    rows: Math.max(MIN_ROWS, Math.floor(m.height / m.cellHeight)),
  };
}

type RenderService = {
  dimensions?: { css?: { cell?: { width: number; height: number } } };
  clear?: () => void;
};

function renderService(term: Terminal): RenderService | null {
  return (
    (term as unknown as { _core?: { _renderService?: RenderService } })._core
      ?._renderService ?? null
  );
}

// xterm overlays its scrollbar on the grid, so a fit reserves that lane or the
// last columns sit under it. Paterm hides the scrollbar (globals.css), so
// measuring beats @xterm/addon-fit's blind 14 px: the lane costs ~2 columns.
function scrollbarLaneWidth(element: HTMLElement): number {
  const bar = element.querySelector<HTMLElement>(".scrollbar.vertical");
  return bar ? bar.offsetWidth : 0;
}

function px(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export function fitTerminal(term: Terminal): void {
  const element = term.element;
  const parent = element?.parentElement;
  if (!element || !parent) return;
  const service = renderService(term);
  const cell = service?.dimensions?.css?.cell;
  if (!cell) return;

  const parentStyle = getComputedStyle(parent);
  const style = getComputedStyle(element);
  const dims = computeFitDims({
    width:
      px(parentStyle.width) -
      px(style.paddingLeft) -
      px(style.paddingRight) -
      scrollbarLaneWidth(element),
    height:
      px(parentStyle.height) - px(style.paddingTop) - px(style.paddingBottom),
    cellWidth: cell.width,
    cellHeight: cell.height,
  });
  if (!dims) return;
  if (dims.cols === term.cols && dims.rows === term.rows) return;

  service?.clear?.();
  term.resize(dims.cols, dims.rows);
}
