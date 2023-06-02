import { Button, Grid } from '@mui/material';
import { FC, useState } from 'react';
import { useStyles } from './style';
import { InscriptionDescription } from '../InscriptionDescription';
import { DialogInscription } from '../DialogInscription';

export const AdminInscriptionCard: FC<any> = ({ id, createdAt, ...props }) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid className={classes.card}>
      <Grid className={classes.startGrid}>
        <InscriptionDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Grid className={classes.rightButtons}>
          <Button onClick={handleOpen} className={classes.button}>
            Comprobante
          </Button>
        </Grid>
      </Grid>
      <DialogInscription open={open} onClose={handleClose} />
    </Grid>
  );
};
