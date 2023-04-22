import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { MatchDialog } from '../MatchDialog';
import { Match } from '../Match';
import { useStyles } from './style';

export interface BoxTeamProps {
  id: number;
  local: TeamStatus;
  visiting: TeamStatus;
}

export interface TeamStatus {
  name: string;
  goals: number;
  cards: TypeCards;
}

interface TypeCards {
  yellow: any[];
  red: any[];
}

export const BoxTeams: FC<BoxTeamProps> = ({ id, local, visiting }) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container data-testid="BoxTeams" className={classes.gridContainer}>
      <Grid data-testid="BoxTeams-grid-teams" className={classes.gridTeam} onClick={handleClickOpen}>
        <Match local={local} visiting={visiting} />
      </Grid>
      <MatchDialog open={open} close={handleClose} matchId={id} />
    </Grid>
  );
};
