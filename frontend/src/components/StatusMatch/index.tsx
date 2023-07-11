import { Typography } from '@mui/material';
import { FC } from 'react';
import { MatchStatus } from '../../interfaces';
import { useStyles } from './style';

export const StatusMatch: FC<any> = ({ status, className, ...typographyProps }) => {
  const { classes, cx } = useStyles();
  return (
    <Typography
      variant="body1"
      className={cx(classes.statusMatch, className)}
      style={{ backgroundColor: status === MatchStatus.FINISHED ? 'red' : 'green' }}
      {...typographyProps}
    >
      {status === MatchStatus.FINISHED
        ? 'Finalizado'
        : status === MatchStatus.TOSTART
        ? 'A jugar'
        : 'En juego'}
    </Typography>
  );
};
