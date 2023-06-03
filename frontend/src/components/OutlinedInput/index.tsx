import { inputLabelClasses, TextField } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const OutlinedInput: FC<any> = (props) => {
  const { classes } = useStyles();

  return (
    <TextField
      InputProps={{ classes: { notchedOutline: classes.notchedOutline, input: classes.input } }}
      InputLabelProps={{
        sx: {
          color: 'white',
          [`&.${inputLabelClasses.shrink}`]: {
            color: 'white',
          },
        },
      }}
      style={{ color: 'white', width: '100%' }}
      {...props}
    />
  );
};
