import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { Navbar } from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { AdminEnrollmentTabs } from '../../components/AdminEnrollmentTabs';

export const AdminInscription: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Navbar button={{ action: () => navigate('/admin/tournaments'), text: 'mis torneos' }}>
      <Grid className={classes.grid}>
        <Grid className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Inscripciones
          </Typography>
        </Grid>
        <Grid className={classes.card}>
          <AdminEnrollmentTabs />
        </Grid>
      </Grid>
    </Navbar>
  );
};
