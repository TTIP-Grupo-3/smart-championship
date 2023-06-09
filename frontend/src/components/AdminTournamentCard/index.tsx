import { Button, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStyles } from './style';
import { TournamentDescription } from '../TournamentDescription';
import { TournamentDialog } from '../TournamentDialog';

export const AdminTournamentCard: FC<any> = ({ id, createdAt, handleEdit, handleInit, ...props }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <TournamentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Button onClick={handleInit} className={classes.button} disabled={props.size > 0}>
          Iniciar
        </Button>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Button onClick={() => handleEdit(id)} className={classes.button}>
            Editar
          </Button>

          <IconButton onClick={(): void => console.log('')}>
            <DeleteOutlineIcon className={classes.delete} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
