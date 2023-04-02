import { Box } from '@mui/material';
import { useStyles } from './style';

export const Bracket = () => {
  const { classes } = useStyles();
  return (
    <>
      <Box className={classes.bracketTeamsConnection} />
      <Box className={classes.bracketTeamConnect} />
    </>
  );
};
