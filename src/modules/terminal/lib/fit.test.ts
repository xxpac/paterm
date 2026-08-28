import type { Terminal } from "@xterm/xterm";
import { afterEach, describe, expect, it, vi } from "vitest";
import { computeFitDims, fitTerminal } from "./fit";

const CELL = { cellWidth: 8.4, cellHeight: 17 };

describe("computeFitDims", () => {
  it("floors the pixel box into whole cells", () => {
    expect(computeFitDims({ width: 800, height: 400, ...CELL })).toEqual({
      cols: 95,
      rows: 23,
    });
  });

  it("spends the lane xterm reserves for its hidden scrollbar", () => {
    const withLane = computeFitDims({ width: 800 - 14, height: 400, ...CELL });
    const withoutLane = computeFitDims({ width: 800, height: 400, ...CELL });

    expect(withLane?.cols).toBe(93);
    expect(withoutLane?.cols).toBe(95);
  });

  it("clamps a tiny pane to a usable grid", () => {
    expect(computeFitDims({ width: 4, height: 4, ...CELL })).toEqual({
      cols: 2,
      rows: 1,
    });
  });

  it("returns null when the box cannot be measured", () => {
    expect(computeFitDims({ width: 0, height: 400, ...CELL })).toBeNull();
    expect(computeFitDims({ width: 800, height: 0, ...CELL })).toBeNull();
    expect(
      computeFitDims({ width: Number.NaN, height: 400, ...CELL }),
    ).toBeNull();
  });

  it("returns null before the renderer has measured a cell", () => {
    expect(
      computeFitDims({ width: 800, height: 400, cellWidth: 0, cellHeight: 0 }),
    ).toBeNull();
  });
});

type Styled = { __style: Record<string, string> };

const originalGetComputedStyle = globalThis.getComputedStyle;

function stubComputedStyle(): void {
  Object.defineProperty(globalThis, "getComputedStyle", {
    configurable: true,
    value: (el: Styled) => el.__style,
  });
}

function fakeTerminal(opts: {
  width: number;
  height: number;
  // null models a terminal whose scrollbar element does not exist yet.
  scrollbarWidth: number | null;
  cols?: number;
  rows?: number;
}) {
  const bar =
    opts.scrollbarWidth === null ? null : { offsetWidth: opts.scrollbarWidth };
  const host: Styled = {
    __style: { width: `${opts.width}px`, height: `${opts.height}px` },
  };
  const element = {
    __style: {
      paddingLeft: "0px",
      paddingRight: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    parentElement: host,
    querySelector: () => bar,
  };
  return {
    cols: opts.cols ?? 80,
    rows: opts.rows ?? 24,
    element,
    resize: vi.fn(),
    _core: {
      _renderService: {
        dimensions: { css: { cell: { width: 8.4, height: 17 } } },
        clear: vi.fn(),
      },
    },
  };
}

describe("fitTerminal", () => {
  afterEach(() => {
    Object.defineProperty(globalThis, "getComputedStyle", {
      configurable: true,
      value: originalGetComputedStyle,
    });
  });

  it("gives the hidden scrollbar lane back to the grid", () => {
    stubComputedStyle();
    const term = fakeTerminal({
      width: 800,
      height: 400,
      scrollbarWidth: 0,
    });

    fitTerminal(term as unknown as Terminal);

    expect(term.resize).toHaveBeenCalledWith(95, 23);
    expect(term._core._renderService.clear).toHaveBeenCalledOnce();
  });

  it("keeps columns clear of a scrollbar that is actually shown", () => {
    stubComputedStyle();
    const term = fakeTerminal({ width: 800, height: 400, scrollbarWidth: 14 });

    fitTerminal(term as unknown as Terminal);

    expect(term.resize).toHaveBeenCalledWith(93, 23);
  });

  it("reserves nothing when the scrollbar element is absent", () => {
    stubComputedStyle();
    const term = fakeTerminal({
      width: 800,
      height: 400,
      scrollbarWidth: null,
    });

    fitTerminal(term as unknown as Terminal);

    expect(term.resize).toHaveBeenCalledWith(95, 23);
  });

  it("leaves an unmeasurable pane at its current grid", () => {
    stubComputedStyle();
    const term = fakeTerminal({ width: 0, height: 0, scrollbarWidth: 0 });

    fitTerminal(term as unknown as Terminal);

    expect(term.resize).not.toHaveBeenCalled();
    expect(term._core._renderService.clear).not.toHaveBeenCalled();
  });

  it("does not touch the renderer when the grid already fits", () => {
    stubComputedStyle();
    const term = fakeTerminal({
      width: 800,
      height: 400,
      scrollbarWidth: 0,
      cols: 95,
      rows: 23,
    });

    fitTerminal(term as unknown as Terminal);

    expect(term.resize).not.toHaveBeenCalled();
    expect(term._core._renderService.clear).not.toHaveBeenCalled();
  });
});
