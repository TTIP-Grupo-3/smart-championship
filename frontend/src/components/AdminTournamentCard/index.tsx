import { Button, Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import { TournamentDescription } from '../TournamentDescription';

export const AdminTournamentCard: FC<any> = ({ id, createdAt, ...props }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <TournamentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Button onClick={(): void => navigate(`/`)} className={classes.button}>
            Modificar
          </Button>
          <IconButton onClick={(): void => console.log('')}>
            <DeleteOutlineIcon className={classes.delete} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
