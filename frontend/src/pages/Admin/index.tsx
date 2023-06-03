/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { Navbar } from '../../components/NavBar';
import { AdminTournamentCard } from '../../components/AdminTournamentCard';
import Scroll from '../../components/Scroll';
import { SearchInput } from '../../components/SearchInput';
import { useNavigate } from 'react-router-dom';
import { TournamentDialog } from '../../components/TournamentDialog';
import { API } from '../../services/Championship';

export const Admin: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<any>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    API.getChampionships().then((r) => setTournaments(r.data));
  }, []);

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
            {tournaments?.map((tournament: any) => (
              <AdminTournamentCard key={tournament.id} {...tournament} />
            ))}
          </Scroll>
        </Grid>
      </Grid>
      <TournamentDialog title="Crear Torneo" open={open} onClose={handleClose} />
    </Navbar>
  );
};
