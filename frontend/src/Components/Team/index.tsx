import { Divider, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxTeams';
import { CardRefereeIcon } from '../CardRefereeIcon';
import { useStyles } from './style';

interface TeamProps {
  dataTeam: TeamStatus;
}

export const Team: FC<TeamProps> = ({ dataTeam }) => {
  const { classes } = useStyles();
  return (
    <Grid container direction="row" justifyContent="flex-start" className={classes.backgroundTeamCard}>
      <CardRefereeIcon color="red" />
      <Typography color="black" paddingRight={0.5}>
        {dataTeam.cards.red}
      </Typography>
      <Divider orientation="vertical" flexItem className={classes.diVertical} />
      <CardRefereeIcon color="yellow" />
      <Typography color="black" paddingRight={0.5}>
        {dataTeam.cards.yellow}
      </Typography>
      <Divider orientation="vertical" flexItem className={classes.diVertical} />
      <Typography className={classes.nameTypo} noWrap>
        {dataTeam.name}
      </Typography>
      <Grid className={classes.containerScore} direction="row">
        <Typography className={classes.goalsTypo}>{dataTeam.goals}</Typography>
      </Grid>
    </Grid>
  );
};
