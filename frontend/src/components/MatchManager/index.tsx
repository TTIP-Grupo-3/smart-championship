import { Grid } from '@mui/material';
import { FC } from 'react';
import { AnotationVeedor } from '../AnotationVeedor';

export const MatchManager: FC<any> = ({
  buttonLeftLocal,
  buttonRightLocal,
  buttonLeftVisiting,
  buttonRightVisiting,
  icons,
}) => {
  return (
    <Grid container direction="row">
      <AnotationVeedor
        buttonLeftAction={buttonLeftLocal}
        buttonLeftChild={icons.left}
        buttonRightAction={buttonRightLocal}
        buttonRightChild={icons.right}
      />
      <Grid style={{ display: 'flex', width: '4.4%' }}></Grid>

      <AnotationVeedor
        buttonLeftAction={buttonLeftVisiting}
        buttonLeftChild={icons.left}
        buttonRightAction={buttonRightVisiting}
        buttonRightChild={icons.right}
      />
    </Grid>
  );
};
