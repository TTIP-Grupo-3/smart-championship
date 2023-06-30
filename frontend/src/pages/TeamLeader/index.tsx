import { Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
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
import { LeaderEnrollment } from '../../interfaces';
import { EmptyTeam } from '../../components/EmptyTeam';
import { Loader } from '../../components/Loader';
import SnackBar from '../../components/Snackbar';
import { delay } from '../Admin';

const msgTypes: any = {
  success: 'Jugador agregado correctamente',
  error: 'Ha ocurrido un error intenta mas tarde',
};

export const TeamLeader: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openEnrollments, setOpenEnrollments] = useState(false);
  const [openTeamCreator, setOpenCreator] = useState(false);
  const [leaderData, setLeaderData] = useState<LeaderEnrollment>();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openS, setOpenS] = useState<any>({ open: false, type: 'success' });
  const [players, setPlayers] = useState<any[]>([]);
  const theme = useTheme();

  const handleEnroll = () => {
    navigate('/leader/enrollment/tournaments');
  };

  const handleEnrollments = () => {
    setOpenEnrollments(true);
  };

  const handleCreate = () => {
    setOpenCreator(true);
  };

  const onClose = () => {
    setOpenPlayer(false);
  };

  const addPlayer = () => {
    setOpenPlayer(true);
  };

  useEffect(() => {
    loadPlayers();
    loadTeamData();
  }, []);

  const onSuccess = async () => {
    onClose();
    setOpenS({ open: true, type: 'success' });
    await delay(2000);
    setOpenS({ open: false, type: 'success' });
  };

  const onError = async () => {
    setOpenS({ open: true, type: 'error' });
    onClose();
    await delay(2000);
    setOpenS({ open: false, type: 'error' });
  };

  const loadTeamData = () => {
    setIsLoading(true);
    API_TEAM_LEADER.getTeamLeader()
      .then(({ data }) => {
        setLeaderData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(true));
  };

  const createPlayer = async (player: any) => {
    API_TEAM_LEADER.createPlayer(player)
      .then(async () => {
        await loadPlayers();
        onSuccess();
      })
      .catch(onError);
  };

  const loadPlayers = () => API_TEAM_LEADER.getPlayers().then(({ data }) => setPlayers(data));

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
              reload={loadTeamData}
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
                    <Button
                      className={classes.buttonEnroll}
                      disabled={!leaderData.enrollments.length}
                      onClick={handleEnrollments}
                    >
                      <Typography className={classes.buttonText}>Mis inscripciones</Typography>
                    </Button>
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
      <SnackBar
        open={openS.open}
        vertical={'bottom'}
        horizontal={'center'}
        msgSnack={msgTypes[openS.type]}
        type={openS.type}
        handleClose={() => setOpenS((prev: any) => ({ ...prev, open: false }))}
      />
    </Navbar>
  );
};
