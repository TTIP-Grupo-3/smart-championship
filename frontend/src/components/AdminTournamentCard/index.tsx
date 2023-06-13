import { Button, Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStyles } from './style';
import { TournamentDescription } from '../TournamentDescription';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <TournamentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        {/*   <Grid className={classes.rightSpacer} />*/}
        <Grid className={classes.rightButtons}>
          <Button onClick={() => handleInit(id)} className={classes.button} disabled={status === 'STARTED'}>
            Iniciar
          </Button>
          <Button onClick={() => handleEdit(id)} className={classes.button} disabled={status === 'STARTED'}>
            Editar
          </Button>
          <Button onClick={() => navigate(`/admin/enrollments/${id}`)} className={classes.button}>
            Inscripciones
          </Button>

          {/*<IconButton onClick={(): void => console.log('')}>
            <DeleteOutlineIcon className={classes.delete} />
  </IconButton>*/}
        </Grid>
      </Grid>
    </Grid>
  );
};
