// GameState.ts — a lányok értékei és a világállapot
// Headless, UI-független

export interface GirlStats {
  closeness: number; // 0–100
  trust: number;     // 0–5
  anger: number;     // 0–5
  flags: Set<string>;
}

export interface GameState {
  week: number;
  risk: number; // 0–100
  girls: {
    rebeka: GirlStats;
    boglarka: GirlStats;
    greta: GirlStats;
  };
  route: 'none' | 'rebeka' | 'boglarka' | 'greta' | 'boglarka_greta' | 'rebeka_greta';
}

export function createInitialState(): GameState {
  const empty = (): GirlStats => ({
    closeness: 0,
    trust: 0,
    anger: 0,
    flags: new Set(),
  });
  return {
    week: 1,
    risk: 0,
    girls: {
      rebeka: empty(),
      boglarka: empty(),
      greta: empty(),
    },
    route: 'none',
  };
}

export function applyEffect(
  state: GameState,
  girl: keyof GameState['girls'],
  effect: {
    closeness?: number;
    trust?: number;
    anger?: number;
    risk?: number;
    flags?: string[];
  }
): GameState {
  const next = structuredClone(state);
  const g = next.girls[girl];
  if (effect.closeness) g.closeness = Math.max(0, Math.min(100, g.closeness + effect.closeness));
  if (effect.trust) g.trust = Math.max(0, Math.min(5, g.trust + effect.trust));
  if (effect.anger) g.anger = Math.max(0, Math.min(5, g.anger + effect.anger));
  if (effect.risk) next.risk = Math.max(0, Math.min(100, next.risk + effect.risk));
  if (effect.flags) effect.flags.forEach(f => g.flags.add(f));
  return next;
}
