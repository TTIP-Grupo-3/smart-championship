import { Grid } from '@mui/material';
import { FC } from 'react';
import { AnotationVeedor } from '../AnotationVeedor';

export const MatchManager: FC<any> = ({
  buttonLeftLocal,
  buttonRightLocal,
  buttonLeftVisiting,
  buttonRightVisiting,
}) => {
  return (
    <Grid container direction="row">
      <AnotationVeedor
        buttonLeftAction={buttonLeftLocal}
        buttonLeftChild={'+'}
        buttonRightAction={buttonRightLocal}
        buttonRightChild={'-'}
      />
      <Grid style={{ display: 'flex' }}></Grid>

      <AnotationVeedor
        buttonLeftAction={buttonLeftVisiting}
        buttonLeftChild={'+'}
        buttonRightAction={buttonRightVisiting}
        buttonRightChild={'-'}
      />
    </Grid>
  );
};
