import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { MatchDialog } from '../MatchDialog';
import { Match } from '../Match';
import { useStyles } from './style';
import { useParams } from 'react-router-dom';

export interface BoxMatchProps {
  id: number;
  local: TeamStatus;
  visiting: TeamStatus;
  status: string;
}

export interface TeamStatus {
  name: string;
  goals: number;
  cards: TypeCards;
  logo: string | null;
}

interface TypeCards {
  yellow: any[] | number;
  red: any[] | number;
}

export const BoxMatch: FC<BoxMatchProps> = ({ id: matchId, local, visiting, status }) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container data-testid="BoxTeams" className={classes.gridContainer}>
      <Grid data-testid="BoxTeams-grid-teams" className={classes.gridTeam} onClick={handleClickOpen}>
        <Match local={local} visiting={visiting} status={status} />
      </Grid>
      {open && (
        <MatchDialog
          open={open}
          close={handleClose}
          matchId={matchId}
          championshipData={{ type: 'elimination', id: id }}
        />
      )}
    </Grid>
  );
};
