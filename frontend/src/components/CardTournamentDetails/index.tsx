import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, Grid } from '@mui/material';
import { FC } from 'react';
import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useStyles } from './style';
import { statuses } from '../TeamEnrollmentCard';

export type TypesTournament = { [key: string]: string };

export const CardTournamentDetails: FC<any> = ({ enrollment }) => {
  const { classes } = useStyles();
  const types: TypesTournament = { score: 'clasificación', elimination: 'eliminación' };

  return (
    <Grid item xs={10}>
      <Card className={classes.card} elevation={24}>
        <CardContent>
          <Grid container className={classes.container}>
            <Typography variant="h5" component="div" color="white" paddingRight={1}>
              {enrollment?.championship?.name}
            </Typography>
            <Chip
              variant="outlined"
              label={types[enrollment?.championship?.type]}
              style={{
                color: enrollment?.championship?.type === 'score' ? 'orange' : blue[400],
                border:
                  enrollment?.championship?.type === 'score'
                    ? '1px solid orange'
                    : `1px solid ${blue[400]}`,
              }}
            />
          </Grid>
          <Typography color="white" fontSize={15} paddingLeft={1} paddingTop={2}>
            Fecha Inicio : {dayjs(enrollment.date).format('DD/MM/YYYY HH:MM')}
          </Typography>
          <Typography color="white" fontSize={15} paddingLeft={1} paddingTop={2}>
            Precio : $ {enrollment.price}
          </Typography>

          <Grid container direction={'row'} alignItems={'center'} paddingTop={2}>
            <Typography
              className={classes.leaderStatusEnroll}
              style={{
                backgroundColor: statuses[enrollment?.status]?.color,
              }}
            >
              {statuses[enrollment.status]?.text}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
