/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useStyles } from './style';
import { CardTournamentDetails } from '../../components/CardTournamentDetails';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const EnrollingDetails = () => {
  const { classes } = useStyles();
  const { id, enrollmentId } = useParams();
  const theme = useTheme();
  const [enrollment, setEnrollment] = useState<any>({
    name: '',
    price: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    API_TEAM_LEADER.getEnrollment(+id!, +enrollmentId!).then(({ data }) => setEnrollment(data));
  }, []);

  const handleBack = () => {
    navigate(`/leader`);
  };

  const handlePay = () => {
    navigate(`/leader/enrolling/receipt/${enrollment?.championship.id}/upload/${enrollment.id}`);
  };
  return (
    <Navbar
      button={{
        action: (): void => navigate('/leader/enrollment/tournaments'),
        text: 'Volver',
        icon: (
          <ArrowBackIosIcon style={{ height: 18, display: 'flex', color: theme.palette.common.white }} />
        ),
      }}
    >
      <Grid className={classes.grid}>
        <Typography className={classes.reservationTitle}>Detalles de inscripcion</Typography>
        <Grid container className={classes.gridWrap}>
          <CardTournamentDetails enrollment={enrollment}></CardTournamentDetails>
        </Grid>

        <Grid container className={classes.buttonReservationGrid}>
          <Button
            className={classes.confirmReservation}
            onClick={enrollment.status === 'to_pay' ? handlePay : handleBack}
          >
            {enrollment.status === 'to_pay' ? 'Cargar comprobante' : 'Volver'}
          </Button>
        </Grid>
      </Grid>
    </Navbar>
  );
};
