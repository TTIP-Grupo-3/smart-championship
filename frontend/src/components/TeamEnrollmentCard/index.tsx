import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';
import { EnrollmentDescription } from '../EnrollmentDescription';
import { useNavigate } from 'react-router-dom';

export const statuses: any = {
  rejected: { color: 'red', text: 'Rechazado' },
  paid: { color: 'green', text: 'Aprobado' },
  to_review: { color: 'lightgreen', text: 'En Revision' },
  to_pay: { color: '#ED7D31', text: 'No pagado' },
  expired: { color: '#8d6e63', text: 'Expirado' },
};

export const TeamEnrollmentCard: FC<any> = ({ id, status, ...props }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleDetails = (id: number) =>
    navigate(`/leader/enrollments/${props.championship.id}/enrollment/${id}/details`);

  return (
    <Grid className={classes.card} key={id}>
      <Grid className={classes.startGrid}>
        <EnrollmentDescription {...props} />
      </Grid>
      <Grid className={classes.endGrid}>
        <Grid className={classes.rightSpacer} />
        <Button className={classes.buttonDetails} onClick={() => handleDetails(id)}>
          Detalles
        </Button>

        <Grid className={classes.rightButtons}>
          <Typography className={classes.status} style={{ backgroundColor: statuses[status].color }}>
            {statuses[status].text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
