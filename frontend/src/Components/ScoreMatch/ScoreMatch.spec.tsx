import { ScoreMatch } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;

const { mountComponent } = componentMounter(ScoreMatch, { localGoals: 1, visitingGoals: 2 }, theme);

describe('ScoreMatch', () => {
  beforeEach(() => mountComponent());
});
