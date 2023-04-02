import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxTeams';
import { useStyles } from './style';

interface TeamProps {
  dataTeam: TeamStatus;
}

export const Team: FC<TeamProps> = ({ dataTeam }) => {
  const { classes } = useStyles();
  return (
    <Grid container direction="row" justifyContent="center" className={classes.backgroundTeamCard}>
      <Typography color="black" width={'80%'}>
        {dataTeam.name}
      </Typography>
      <Typography textAlign="end">{dataTeam.goals}</Typography>
    </Grid>
  );
};
