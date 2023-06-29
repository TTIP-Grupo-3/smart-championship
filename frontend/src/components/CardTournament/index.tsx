import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Grid } from '@mui/material';
import image from '../../prueba.jpg';
import { FC } from 'react';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useStyles } from './style';

export type TypesTournament = { [key: string]: string };

export const CardTournament: FC<any> = ({ championship }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const types: TypesTournament = { score: 'clasificacion', elimination: 'eliminacion' };
  const handleTournament = () => {
    navigate(`/${types[championship.type]}/${championship.id}`);
  };

  return (
    <Grid item>
      <Card className={classes.card} elevation={24}>
        <CardActionArea onClick={handleTournament}>
          <CardMedia component="img" height="140" width="auto" src={image} />
          <CardContent>
            <Grid container flexDirection="row" display="flex" alignItems="center">
              <Typography gutterBottom variant="h5" component="div" color="white" paddingRight={1}>
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
              Fecha Inicio : {dayjs(championship.date).format('DD/MM/YYYY')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
