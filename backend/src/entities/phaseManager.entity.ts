import { EliminationMatch } from './eliminationMatch.entity';
import { Phase } from './phase.entity';

export class PhaseManager {
  phases: Array<Phase>;

  public get phase(): Phase | null {
    return this.phases[0] ?? null;
  }

  public get next(): PhaseManager | null {
    return this.hasNext ? new PhaseManager(this.phases.slice(1)) : null;
  }

  private get hasNext(): boolean {
    return this.phases.length > 1;
  }

  constructor(phases: Array<Phase>) {
    this.phases = phases;
  }

  static from(match: EliminationMatch): PhaseManager {
    return new PhaseManager(match.phases);
  }
}
