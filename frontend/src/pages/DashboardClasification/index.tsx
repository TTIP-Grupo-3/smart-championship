import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClasificationTournamentTabs } from '../../components/ClassificationTournamentTabs';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';

export const DashboardClasification = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Navbar button={{ action: () => navigate(-1), text: 'Inicio' }}>
      <Grid className={classes.gridContainer}>
        <ClasificationTournamentTabs />
      </Grid>
    </Navbar>
  );
};
