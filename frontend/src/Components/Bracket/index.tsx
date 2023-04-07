import { Box } from '@mui/material';
import { useStyles } from './style';

export const Bracket = () => {
  const { classes } = useStyles();
  return (
    <>
      <Box data-testid="Bracket-connection-round" className={classes.bracketTeamsConnection} />
      <Box data-testid="Bracket-connection-team" className={classes.bracketTeamConnect} />
    </>
  );
};
