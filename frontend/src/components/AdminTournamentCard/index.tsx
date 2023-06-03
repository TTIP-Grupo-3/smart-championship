import { Button, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStyles } from './style';
import { TournamentDescription } from '../TournamentDescription';
import { TournamentDialog } from '../TournamentDialog';

export const AdminTournamentCard: FC<any> = ({ id, createdAt, ...props }) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <TournamentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Button onClick={handleOpen} className={classes.button}>
            Modificar
          </Button>
          <IconButton onClick={(): void => console.log('')}>
            <DeleteOutlineIcon className={classes.delete} />
          </IconButton>
        </Grid>
      </Grid>
      <TournamentDialog title="Modificar Torneo" open={open} onClose={handleClose} />
    </Grid>
  );
};
