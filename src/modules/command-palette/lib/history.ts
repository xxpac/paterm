import { invoke } from "@tauri-apps/api/core";

/** Fuzzy-search recorded shell history for the command palette (`>` mode). */
export function historyList(query: string, limit = 200): Promise<string[]> {
  return invoke<string[]>("history_list", { query, limit }).catch(() => []);
}
