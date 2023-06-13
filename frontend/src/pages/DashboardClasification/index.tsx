/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ClasificationTournamentTabs } from '../../components/ClassificationTournamentTabs';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useEffect, useState } from 'react';
import { API } from '../../services/Championship';

interface ClasificationTournament {
  name: string;
}

export const DashboardClasification = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournament, setTournament] = useState<ClasificationTournament>({ name: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getChampionshipId(+id!).then((r) => {
      setTournament(r.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Navbar
      button={{
        action: () => navigate('/'),
        text: 'Torneos',
        icon: <EmojiEventsIcon style={{ height: 22, display: 'flex', color: 'yellow' }} />,
      }}
    >
      <Typography className={classes.tournamentTitle}>
        {isLoading ? 'Cargando...' : tournament.name}
      </Typography>
      <Grid className={classes.gridContainer}>
        <ClasificationTournamentTabs />
      </Grid>
    </Navbar>
  );
};
