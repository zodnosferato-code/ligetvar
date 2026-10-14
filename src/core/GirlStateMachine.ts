// GirlStateMachine.ts — lányonkénti állapotgép
// A meglévő GirlStats + flag rendszerre épül.
// Headless, UI-független.

import { GirlStats, GameState } from './GameState';

export type GirlPhase =
  | 'unknown'          // még nem találkozott
  | 'introduced'       // intro dialógus lefutott
  | 'warming'          // ismételhető beszélgetések, feladatok
  | 'private'          // lakáslátogatás / privát hely lehetséges
  | 'intimate_early'   // act_flash / act_kiss_light elérhető
  | 'route_candidate'  // 7–8. hét, útvonalzárra jelölt
  | 'route_locked'     // 9. héttől a kiválasztott útvonalon
  | 'broken'           // törés (harag vagy kockázat)
  | 'fulfilled';       // desire_fulfill elért (végállapot)

export interface GirlMachineState {
  phase: GirlPhase;
  // A számok és flag-ek a GameState-ből jönnek, itt csak a fázis
}

export class GirlStateMachine {
  constructor(
    private girlKey: keyof GameState['girls'],
    private getStats: () => GirlStats,
    private getWeek: () => number,
    private getRisk: () => number,
    private getRoute: () => GameState['route']
  ) {}

  /** Aktuális fázis kiszámítása a meglévő adatokból. */
  current(): GirlPhase {
    const s = this.getStats();
    const week = this.getWeek();
    const risk = this.getRisk();
    const route = this.getRoute();

    if (s.anger >= 4 || risk >= 80) return 'broken';
    if (s.flags.has(`flag_${this.girlKey}_desire_fulfill`)) return 'fulfilled';

    const isSelected =
      route === this.girlKey ||
      (route === 'boglarka_greta' && (this.girlKey === 'boglarka' || this.girlKey === 'greta'));

    if (week >= 9 && isSelected) return 'route_locked';
    if (week >= 7 && s.trust >= 2 && s.closeness >= 40) return 'route_candidate';

    if (s.flags.has(`flag_${this.girlKey}_kiss_light`) || s.flags.has(`flag_${this.girlKey}_flash`)) {
      return 'intimate_early';
    }

    if (s.flags.has('rebeka_foto') || s.flags.has('boglarka_margo') || s.flags.has('greta_lista') || s.trust >= 2) {
      return 'private';
    }

    if (s.flags.has('rebeka_kor') || s.flags.has('boglarka_margo') || s.flags.has('greta_lista') || s.closeness >= 10) {
      return 'warming';
    }

    if (s.closeness > 0 || s.trust > 0) return 'introduced';
    return 'unknown';
  }

  /** Egyszerű ellenőrzés: elérhető-e egy eszkalációs lépés. */
  canEscalate(step: 'flash' | 'kiss_light' | 'touch' | 'desire_fulfill'): boolean {
    const phase = this.current();
    const s = this.getStats();

    switch (step) {
      case 'flash':
        return (phase === 'warming' || phase === 'private') && s.trust >= 1;
      case 'kiss_light':
        return (phase === 'private' || phase === 'intimate_early') && s.trust >= 2;
      case 'touch':
        return phase === 'intimate_early' && s.trust >= 3;
      case 'desire_fulfill':
        return (phase === 'route_locked' || phase === 'route_candidate') && s.trust >= 4;
      default:
        return false;
    }
  }

  /** Emberileg olvasható leírás debughoz. */
  describe(): string {
    return `${this.girlKey}: ${this.current()} (trust ${this.getStats().trust}, closeness ${this.getStats().closeness})`;
  }
}
