/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardTournamentEnroll } from '../../components/CardTournamentEnroll';
import { Navbar } from '../../components/NavBar';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useStyles } from './style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const EnrollReservation = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [championship, setChampionship] = useState({ name: '', date: '', duration: 0, teamSize: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    API_TEAM_LEADER.championshipToEnroll(+id!).then((r: any) => setChampionship(r.data));
  }, [id]);

  const handleReservation = () => {
    API_TEAM_LEADER.enrollToChampionship(+id!).then(({ data }) => {
      navigate(`/leader/enrolling/receipt/${id}/upload/${data.id}`);
    });
  };
  return (
    <Navbar
      button={{
        action: () => navigate('/leader/enrollment/tournaments'),
        text: 'Volver',
        icon: <ArrowBackIosIcon style={{ height: 18, display: 'flex', color: 'white' }} />,
      }}
    >
      <Grid className={classes.grid}>
        <Typography className={classes.reservationTitle}>Reserva Tu lugar en el torneo</Typography>
        <Grid container className={classes.gridWrap}>
          <CardTournamentEnroll championship={championship}></CardTournamentEnroll>
        </Grid>

        <Grid container className={classes.buttonReservationGrid}>
          <Typography color="white">
            Recuerda: Al reservar tu lugar estas quitandole el cupo a otro equipo, por favor asegurate que
            vas a participar de este torneo
          </Typography>
          <Button className={classes.confirmReservation} onClick={handleReservation}>
            Reservar
          </Button>
        </Grid>
      </Grid>
    </Navbar>
  );
};
