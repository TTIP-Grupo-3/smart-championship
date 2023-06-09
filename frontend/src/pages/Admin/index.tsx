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
import { API_ADMIN } from '../../services/Admin';
import SnackBar from '../../components/Snackbar';

const msgTypes: any = {
  success: 'Cambios realizados correctamente',
  error: 'Ha ocurrido un error intenta mas tarde',
};

export const Admin: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<any>();
  const [open, setOpen] = useState(false);
  const [openS, setOpenS] = useState<any>({ open: false, type: 'success' });
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState<any>();

  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    API_ADMIN.getAdminChampionships().then((r) => setTournaments(r.data));
  }, []);

  const onSuccess = async () => {
    setOpenS({ open: true, type: 'success' });
    API_ADMIN.getAdminChampionships().then((r) => setTournaments(r.data));
    onClose();
    await delay(1000);
    setOpenS({ open: false, type: 'success' });
  };

  const onError = async () => {
    setOpenS({ open: true, type: 'error' });
    onClose();
    await delay(1000);
    setOpenS({ open: false, type: 'error' });
  };

  const handleEdit = (id: number) => {
    handleOpenEdit();
    setId(id);
  };

  const delay = async (time: number) => new Promise((res) => setTimeout(res, time));

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
              <AdminTournamentCard key={tournament.id} {...tournament} {...{ handleEdit }} />
            ))}
          </Scroll>
        </Grid>
      </Grid>
      <TournamentDialog title="Crear Torneo" onClose={onClose} {...{ open, onSuccess, onError }} />
      {openEdit && (
        <TournamentDialog
          title="Modificar Torneo"
          open={openEdit}
          onClose={onCloseEdit}
          {...{ onSuccess, onError, id }}
        />
      )}
      <SnackBar
        open={openS.open}
        vertical={'bottom'}
        horizontal={'center'}
        msgSnack={msgTypes[openS.type]}
        type={openS.type}
        handleClose={() => setOpen((prev: any) => ({ ...prev, open: false }))}
      />
    </Navbar>
  );
};
