import { inputLabelClasses, TextField, useTheme } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const OutlinedInput: FC<any> = (props) => {
  const { classes } = useStyles();
  const theme = useTheme();

  return (
    <TextField
      InputProps={{ classes: { notchedOutline: classes.notchedOutline, input: classes.input } }}
      InputLabelProps={{
        sx: {
          color: theme.palette.common.white,
          [`&.${inputLabelClasses.shrink}`]: {
            color: theme.palette.common.white,
          },
        },
      }}
      style={{ color: theme.palette.common.white, width: '100%' }}
      {...props}
    />
  );
};
