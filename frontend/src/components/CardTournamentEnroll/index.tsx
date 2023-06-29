import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Grid } from '@mui/material';
import { FC } from 'react';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export type TypesTournament = { [key: string]: string };

export const CardTournamentEnroll: FC<any> = ({ championship }) => {
  const navigate = useNavigate();
  const types: TypesTournament = { score: 'clasificacion', elimination: 'eliminacion' };
  const handleTournament = () => {
    navigate(`/leader/enrolling/reservation/${championship.id}`);
  };
  return (
    <Grid item xs={10}>
      <Card sx={{ backgroundColor: 'black', display: 'flex' }} elevation={24}>
        <CardActionArea onClick={handleTournament}>
          <CardContent>
            <Grid container flexDirection="row" display="flex" alignItems="center">
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};