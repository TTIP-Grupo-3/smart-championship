import { Grid } from '@mui/material';
import { ClasificationTournamentTabs } from '../../components/ClassificationTournamentTabs';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';

export const DashboardClasification = () => {
  const { classes } = useStyles();

  return (
    <Navbar>
      <Grid className={classes.gridContainer}>
        <ClasificationTournamentTabs />
      </Grid>
    </Navbar>
  );
};
