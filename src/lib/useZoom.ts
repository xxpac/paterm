import { useEffect, useRef } from "react";
import { usePreferencesStore } from "@/modules/settings/preferences";
import { setZoomLevel } from "@/modules/settings/store";

const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.0;
const CSS_VAR = "--app-zoom";

function clampZoom(z: number): number {
  const rounded = Math.round(z * 100) / 100;
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, rounded));
}

function applyToDom(z: number): void {
  document.documentElement.style.setProperty(CSS_VAR, String(z));
}

// Plain (non-hook) helpers so non-React callers — e.g. the terminal renderer's
// Ctrl+wheel handler — can drive zoom through the same clamped path.
export function zoomIn(): void {
  const current = usePreferencesStore.getState().zoomLevel;
  const next = clampZoom(current + ZOOM_STEP);
  if (next !== current) void setZoomLevel(next);
}

export function zoomOut(): void {
  const current = usePreferencesStore.getState().zoomLevel;
  const next = clampZoom(current - ZOOM_STEP);
  if (next !== current) void setZoomLevel(next);
}

export function zoomReset(): void {
  if (usePreferencesStore.getState().zoomLevel !== 1.0) {
    void setZoomLevel(1.0);
  }
}

export function useZoom() {
  const zoomLevel = usePreferencesStore((s) => s.zoomLevel);
  const hydrated = usePreferencesStore((s) => s.hydrated);
  const lastAppliedRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (lastAppliedRef.current === zoomLevel) return;
    lastAppliedRef.current = zoomLevel;
    applyToDom(zoomLevel);
  }, [hydrated, zoomLevel]);

  return { zoomIn, zoomOut, zoomReset };
}
