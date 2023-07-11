import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';
import { DateTime } from '../DateTime';
import { useStyles } from './style';

export const MatchToStartCard: FC<any> = ({ match, handleChangeDate, phase }) => {
  const { classes, cx } = useStyles();
  return (
    <>
      {!Array.isArray(match) ? (
        <Grid className={classes.gridContainer}>
          <Typography color="white" paddingTop={2} paddingBottom={2} textAlign="center">
            Fecha de Inicio:
          </Typography>
          <Grid container justifyContent="center" alignItems="center" direction={'column'}>
            <DateTime value={dayjs(match.date)} onChange={(e: any) => handleChangeDate(e, match.id)} />
            <Typography color="#D4AF37" alignItems={'center'} padding={1} fontWeight={600}>
              {match?.local.name} vs {match?.visiting.name}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container className={cx(classes.gridElimination, classes.gridContainer)}>
          <Typography color="white" alignItems={'center'} padding={1} fontWeight={600}>
            Fase {phase}
          </Typography>

          {match.map((eliminationMatch: any) => (
            <Grid container justifyContent="center" alignItems="center" direction={'column'}>
              <Typography color="white" paddingTop={2} paddingBottom={2} textAlign="center">
                Fecha de Inicio:
              </Typography>
              <DateTime
                value={dayjs(eliminationMatch.date)}
                onChange={(e: any) => handleChangeDate(e, eliminationMatch.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
