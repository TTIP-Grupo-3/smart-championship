import { Button, Grid, IconButton, Typography, useTheme, Badge } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import smartLogoLocal from '../../default_match_icon_local.svg';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { TeamFormation } from '../../components/TeamFormation';
import AddIcon from '@mui/icons-material/Add';
import { MyEnrollmentsDialog } from '../../components/MyEnrollmentsDialog';
import { AddPlayerDialog } from '../../components/AddPlayerDialog';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { LeaderEnrollment, Player, PlayerCreate } from '../../interfaces';
import { EmptyTeam } from '../../components/EmptyTeam';
import { Loader } from '../../components/Loader';
import { useSnackbar } from '../../hooks/useSnackbar';

export const TeamLeader: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openEnrollments, setOpenEnrollments] = useState(false);
  const [openTeamCreator, setOpenCreator] = useState(false);
  const [leaderData, setLeaderData] = useState<LeaderEnrollment>();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const { Snack, onSuccess, promise } = useSnackbar();
  const theme = useTheme();

  const handleEnroll = (): void => {
    navigate('/leader/enrollment/tournaments');
  };

  const handleEnrollments = (): void => {
    setOpenEnrollments(true);
  };

  const handleCreate = (): void => {
    setOpenCreator(true);
  };

  const onClose = (): void => {
    setOpenPlayer(false);
  };

  const addPlayer = (): void => {
    setOpenPlayer(true);
  };

  useEffect(() => {
    loadPlayers();
    loadTeamData();
  }, []);

  const loadTeamData = (): void => {
    setIsLoading(true);
    API_TEAM_LEADER.getTeamLeader()
      .then(({ data }) => {
        setLeaderData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(true));
  };

  const countPendingEnrollment = (): number => {
    return leaderData?.enrollments.filter((enrollment) => enrollment.status === 'to_pay').length || 0;
  };

  const createPlayer = async (player: PlayerCreate): Promise<void> => {
    promise(API_TEAM_LEADER.createPlayer(player), {
      loading: 'Agregando jugador al equipo',
      success: async () => {
        onClose();
        await loadPlayers();
        onSuccess('Jugador agregado con exito');
      },
      error: 'Ha ocurrido un error intenta mas tarde',
    });
  };

  const loadPlayers = () => API_TEAM_LEADER.getPlayers().then(({ data }) => setPlayers(data));

  const createTeam = (teamName: string, file: File) => {
    const formData = new FormData();
    formData.append('name', teamName);
    formData.append('logo', file as Blob);
    promise(API_TEAM_LEADER.createTeam(formData), {
      loading: 'Creando equipo espere un momento',
      success: () => {
        setOpenCreator(false);
        onSuccess('Equipo creado con exito');
        loadTeamData();
      },
      error: 'Ha ocurrido un error intenta mas tarde',
    });
  };

  return (
    <Navbar
      button={{
        action: () => navigate('/'),
        text: 'Torneos',
        icon: <EmojiEventsIcon style={{ height: 22, display: 'flex', color: 'yellow' }} />,
      }}
    >
      <Grid className={classes.gridRoot}>
        <Typography className={classes.title}>Bienvenido {leaderData?.name}</Typography>

        {!leaderData?.team ? (
          isLoading ? (
            <Loader text="Cargando Equipo" />
          ) : (
            <EmptyTeam
              handleCreate={handleCreate}
              open={openTeamCreator}
              setOpen={setOpenCreator}
              {...{ createTeam }}
            />
          )
        ) : (
          <>
            <Grid container className={classes.gridSpacer} spacing={2}>
              <Grid item className={classes.item} xs={6} md={6} sm={12}>
                <Grid className={classes.team}>
                  <Typography className={classes.teamText}>Equipo:</Typography>
                  <Grid className={classes.gridLogo}>
                    <img
                      width={40}
                      height={40}
                      style={{ borderRadius: '100%' }}
                      src={
                        leaderData.team.logo
                          ? `data:image/png;base64,${leaderData.team.logo}`
                          : smartLogoLocal
                      }
                    />
                    <Typography className={classes.leaderTeamName}>{leaderData.team.name}</Typography>
                  </Grid>
                  <Grid container className={classes.gridLeft}>
                    <Button
                      className={classes.buttonEnroll}
                      onClick={handleEnroll}
                      disabled={players.length < leaderData.minimumSize}
                    >
                      <Typography className={classes.buttonText}>Inscribirse a torneo</Typography>
                    </Button>
                    <Badge className={classes.badge} badgeContent={countPendingEnrollment()}>
                      <Button
                        className={classes.buttonEnroll}
                        disabled={!leaderData.enrollments.length}
                        onClick={handleEnrollments}
                      >
                        <Typography className={classes.buttonText}>Mis inscripciones</Typography>
                      </Button>
                    </Badge>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.item} xs={6} md={6} sm={12}>
                <Grid className={classes.team}>
                  <Grid container className={classes.gridRigthContent}>
                    <Typography className={classes.teamPlayerText}>Jugadores:</Typography>
                    <IconButton onClick={addPlayer} className={classes.addIconButton}>
                      <AddIcon style={{ color: theme.palette.common.white, fontSize: 23 }}></AddIcon>
                    </IconButton>
                  </Grid>

                  <TeamFormation players={players} reloadPlayers={loadPlayers} />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <MyEnrollmentsDialog
          open={openEnrollments}
          setOpen={setOpenEnrollments}
          enrollments={leaderData?.enrollments}
        />
        <AddPlayerDialog open={openPlayer} {...{ onClose, createPlayer }} />
      </Grid>
      <Snack />
    </Navbar>
  );
};
