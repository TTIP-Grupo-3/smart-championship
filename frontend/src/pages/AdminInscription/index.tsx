/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { Navbar } from '../../components/NavBar';
import Scroll from '../../components/Scroll';
import { useNavigate } from 'react-router-dom';
import { AdminInscriptionCard } from '../../components/AdminInscriptionCard';

export const AdminInscription: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const tournaments = [
    {
      id: 1,
      username: 'Diego Moronha',
      created_at: new Date().toISOString(),
      tournamentRequested: 'Torneo futbol 11',
      type: 'Clasificacion',
    },
    {
      id: 2,
      username: 'Adrian Cardozo',
      created_at: new Date().toISOString(),
      tournamentRequested: 'Torneo futbol 11',
      type: 'Eliminacion',
    },
    {
      id: 3,
      username: 'Susana Rosito',
      created_at: new Date().toISOString(),
      tournamentRequested: 'Torneo futbol 11',
      type: 'Clasificacion',
    },
  ];

  return (
    <Navbar button={{ action: () => navigate('/admin/tournaments'), text: 'mis torneos' }}>
      <Grid className={classes.grid}>
        <Grid className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Inscripciones
          </Typography>
        </Grid>
        <Grid className={classes.card}>
          <Scroll className={classes.scroll}>
            {tournaments.map((tournament: any) => (
              <AdminInscriptionCard key={tournament.id} {...tournament} />
            ))}
          </Scroll>
        </Grid>
      </Grid>
    </Navbar>
  );
};
