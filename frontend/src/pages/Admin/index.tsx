/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { Navbar } from '../../components/NavBar';
import { AdminTournamentCard } from '../../components/AdminTournamentCard';
import Scroll from '../../components/Scroll';
import { SearchInput } from '../../components/SearchInput';
import { TournamentDialog } from '../../components/TournamentDialog';
import { API_ADMIN } from '../../services/Admin';
import SnackBar, { MessagesType } from '../../components/Snackbar';
import { Loader } from '../../components/Loader';
import { EmptyData } from '../../components/EmptyData';
import { InitTournamentDialog } from '../../components/InitTournamentDialog';
import { SnackBarState } from '../../interfaces';
import dayjs from 'dayjs';

export const msgTypes: any = {
  success: 'Cambios realizados correctamente',
  error: 'Ha ocurrido un error intenta mas tarde',
  loading: 'Procesando solicitud',
};

export const Admin: FC = () => {
  const { classes } = useStyles();
  const [tournaments, setTournaments] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [openS, setOpenS] = useState<SnackBarState>({ open: false, type: 'loading', message: '' });
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState<number | null>();
  const [searched, setSearched] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [openInit, setOpenInit] = useState(false);
  const [dates, setDates] = useState<any>([]);
  const [matches, setMatches] = useState<any>([]);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    const interval = setInterval(() => {
      API_ADMIN.getAdminChampionships().then(({ data }) => {
        setTournaments(data);
        setIsLoading(false);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getToStartMatches();
  }, [id]);

  const onLoading = (): void => {
    setOpenS({ open: true, type: 'loading', message: msgTypes.loading });
  };

  const onSuccess = async (): Promise<void> => {
    API_ADMIN.getAdminChampionships().then(({ data }) => setTournaments(data));
    onClose();
    setOpenS({ open: true, type: MessagesType.SUCCESS, message: msgTypes.success });
  };

  const onError = async (): Promise<void> => {
    onClose();
    setOpenS({ open: true, type: MessagesType.ERROR, message: msgTypes.error });
  };

  const handleEdit = (id: number): void => {
    handleOpenEdit();
    setId(id);
  };

  const handleInit = (id: number) => {
    setId(id);
    setOpenInit(true);
  };

  const initTournament = () => {
    API_ADMIN.startChampionship(id!).then(onSuccess).catch(onError);
  };

  const searchedProjects = (): Array<any> =>
    tournaments.filter(({ name, size }: any) =>
      [name.toLowerCase(), size.toString()].some((attr) => attr.includes(searched.toLowerCase())),
    );

  const initAndSaveDatesTournament = () => {
    API_ADMIN.addMatchDates(id!, dates).then(() => {
      initTournament();
      setOpenInit(false);
    });
  };

  const handleChangeDate = (e: any, id: number) => {
    const matchChange = dates.filter((date: any) => date?.id !== id);

    setDates([...matchChange, { id: id, date: dayjs(e).toISOString() }]);
  };

  const onCloseDialogInit = () => {
    setOpenInit(false);
    setDates([]);
  };
  const getToStartMatches = () => {
    API_ADMIN.getToStartMatches(id!).then(({ data }) => {
      const matches = data.map((match: any) => (match?.matches ? match.matches : match));
      setMatches(matches);
    });
  };
  const addDateMatches = () => {
    API_ADMIN.addMatchDates(id!, dates)
      .then(() => {
        onSuccess();
        getToStartMatches();
      })
      .catch(onError);
  };

  return (
    <Navbar>
      <Grid className={classes.grid}>
        <Grid className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Torneos
          </Typography>
          <Grid className={classes.endHeader}>
            <Grid className={classes.endHeaderSpacer}>
              <SearchInput onChange={(e) => setSearched(e.target.value)} value={searched} />
            </Grid>
            <Button onClick={handleOpen} classes={{ root: classes.createButton }}>
              <Typography variant="button" className={classes.button} noWrap>
                Crear Torneo
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.card}>
          {isLoading ? (
            <Loader text="Cargando Torneos" style={{ color: '#1990BB' }} />
          ) : !searchedProjects().length ? (
            <EmptyData emptyText="Ups, No hay torneos por aqui" />
          ) : (
            <Scroll className={classes.scroll}>
              {searchedProjects().map((tournament: any) => (
                <AdminTournamentCard key={tournament.id} {...tournament} {...{ handleEdit, handleInit }} />
              ))}
            </Scroll>
          )}
        </Grid>
      </Grid>
      <TournamentDialog
        title="Crear Torneo"
        onClose={onClose}
        {...{ open, onSuccess, onError, onLoading }}
      />
      {openEdit && (
        <TournamentDialog
          title="Modificar Torneo"
          open={openEdit}
          isEdit
          onClose={onCloseEdit}
          {...{ onSuccess, onLoading, onError, id }}
        />
      )}
      <SnackBar
        open={openS.open}
        vertical={'bottom'}
        horizontal={'center'}
        msgSnack={openS.message}
        type={openS.type}
        handleClose={() => setOpenS((prev: any) => ({ ...prev, open: false }))}
      />
      <InitTournamentDialog
        title="Iniciar Torneo"
        open={openInit}
        onClose={onCloseDialogInit}
        {...{
          onSuccess,
          onError,
          initAndSaveDatesTournament,
          handleChangeDate,
          dates,
          matches,
          addDateMatches,
        }}
      />
    </Navbar>
  );
};
