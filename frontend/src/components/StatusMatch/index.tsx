import { Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const StatusMatch: FC<any> = ({ status, className, ...typographyProps }) => {
  const { classes, cx } = useStyles();
  return (
    <Typography
      variant="body1"
      className={cx(classes.statusMatch, className)}
      style={{ backgroundColor: status === 'FINISHED' ? 'red' : 'green' }}
      {...typographyProps}
    >
      {status === 'FINISHED' ? 'Finalizado' : status === 'TOSTART' ? 'A jugar' : 'En juego'}
    </Typography>
  );
};
