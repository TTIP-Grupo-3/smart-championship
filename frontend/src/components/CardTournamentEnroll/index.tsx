import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha, CardActionArea, Chip, Grid, useTheme } from '@mui/material';
import { FC } from 'react';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useStyles } from './style';

export type TypesTournament = { [key: string]: string };

export const CardTournamentEnroll: FC<any> = ({ championship }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const theme = useTheme();
  const types: TypesTournament = { score: 'clasificacion', elimination: 'eliminacion' };

  const handleTournament = () => {
    navigate(`/leader/enrolling/reservation/${championship.id}`);
  };

  const championshipStatus: any = {
    ['Torneo Cerrado']: 'red',
    ['Torneo Reservado']: 'orange',
    ['Torneo Abierto']: 'green',
  };

  const statusName =
    championship.allReserved && championship.close
      ? 'Torneo Cerrado'
      : championship.allReserved
      ? 'Torneo Reservado'
      : 'Torneo Abierto';

  const isNotAvailable = championship.closed || championship.allReserved || championship.isEnrolled;

  return (
    <Grid item xs={10}>
      <Card
        className={classes.card}
        style={
          isNotAvailable
            ? {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                transition: 'none',
                transform: 'none',
              }
            : {}
        }
        elevation={24}
      >
        <CardActionArea onClick={handleTournament} disabled={isNotAvailable}>
          <CardContent>
            <Grid container className={classes.container}>
              <Typography variant="h5" component="div" color="white" paddingRight={1}>
                {championship.name}
              </Typography>
              <Chip
                variant="outlined"
                label={types[championship.type]}
                style={{
                  color: championship.type === 'score' ? 'orange' : blue[400],
                  border: championship.type === 'score' ? '1px solid orange' : `1px solid ${blue[400]}`,
                }}
              />
              <Typography color="grey" fontSize={15} paddingLeft={1}>
                {championship.teamSize} jugadores
              </Typography>
            </Grid>
            <Typography color="grey" fontSize={15} paddingLeft={1} paddingTop={2}>
              Fecha Inicio : {dayjs(championship.date).format('DD/MM/YYYY HH:MM')}
            </Typography>
            <Typography color="grey" fontSize={15} paddingLeft={1} paddingTop={2}>
              Precio : $ {championship.price}
            </Typography>
            <Typography color="grey" fontSize={15} paddingLeft={1} paddingTop={2}>
              Duracion del partido: {championship.duration} minutos
            </Typography>

            <Grid container direction={'row'} alignItems={'center'}>
              <Typography
                color="white"
                fontSize={15}
                fontFamily={'sans-serif'}
                fontWeight={700}
                paddingLeft={1}
                paddingTop={2}
                style={{
                  backgroundColor: championshipStatus[statusName],
                  padding: 6,
                  marginLeft: 7,
                  width: 'fit-content',
                  borderRadius: 5,
                }}
              >
                {statusName}
              </Typography>
              {championship.isEnrolled && (
                <Typography
                  color="#efb810"
                  fontSize={15}
                  fontFamily={'sans-serif'}
                  fontWeight={700}
                  paddingLeft={1}
                  paddingTop={2}
                  style={{
                    border: '3px solid #efb810',
                    padding: 3,
                    marginLeft: 7,
                    width: 'fit-content',
                    borderRadius: 5,
                  }}
                >
                  Inscripto
                </Typography>
              )}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
