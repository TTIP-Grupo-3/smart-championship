import { Button, Grid } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';
import { TournamentDescription } from '../TournamentDescription';
import { useNavigate } from 'react-router-dom';
import { MatchStatus } from '../../interfaces';

export const AdminTournamentCard: FC<any> = ({
  id,
  createdAt,
  handleEdit,
  status,
  handleInit,
  ...props
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const canInit = status === MatchStatus.STARTED || props.size - props.enrolled > 0;

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <TournamentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightButtons}>
          <Button onClick={() => handleInit(id)} className={classes.button} disabled={canInit}>
            Iniciar
          </Button>
          <Button
            onClick={() => handleEdit(id)}
            className={classes.button}
            disabled={status === MatchStatus.STARTED}
          >
            Editar
          </Button>
          <Button onClick={() => navigate(`/admin/enrollments/${id}`)} className={classes.button}>
            Inscripciones
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
