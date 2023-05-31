/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { Navbar } from '../../components/NavBar';
import { AdminTournamentCard } from '../../components/AdminTournamentCard';
import Scroll from '../../components/Scroll';
import { SearchInput } from '../../components/SearchInput';
import { useNavigate } from 'react-router-dom';
import { CreateTournamentDialog } from '../../components/CreateTournamentDialog';

export const Admin: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const tournaments = [
    { id: 1, name: 'Torneo futbol', created_at: new Date().toISOString(), capacity: 10 },
    { id: 2, name: 'Torneo futbol2', created_at: new Date().toISOString(), capacity: 10 },
    { id: 3, name: 'Torneo futbol3', created_at: new Date().toISOString(), capacity: 10 },
  ];
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Navbar button={{ action: () => navigate('/admin/inscriptions'), text: 'inscripciones' }}>
      <Grid className={classes.grid}>
        <Grid className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Torneos
          </Typography>
          <Grid className={classes.endHeader}>
            <Grid className={classes.endHeaderSpacer}>
              <SearchInput onChange={(e): void => console.log('')} value={''} />
            </Grid>
            <Button onClick={handleOpen} classes={{ root: classes.createButton }}>
              <Typography variant="button" className={classes.button} noWrap>
                Crear Torneo
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.card}>
          <Scroll className={classes.scroll}>
            {tournaments.map((tournament: any) => (
              <AdminTournamentCard key={tournament.id} {...tournament} />
            ))}
          </Scroll>
        </Grid>
      </Grid>
      <CreateTournamentDialog open={open} onClose={handleClose} />
    </Navbar>
  );
};
