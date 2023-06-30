import { EliminationMatch } from './eliminationMatch.entity';

export class Phase {
  matches: Array<EliminationMatch>;

  constructor(matches: Array<EliminationMatch>) {
    this.matches = matches;
  }

  static from(...matches: Array<EliminationMatch>): Phase {
    return new Phase(matches);
  }

  static merge(phase: Phase, otherPhase: Phase): Phase {
    return Phase.from(...phase.matches, ...otherPhase.matches);
  }
}
