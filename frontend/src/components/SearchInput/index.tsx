import { FC } from 'react';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStyles } from './style';

export const SearchInput: FC<OutlinedInputProps> = (props) => {
  const { classes } = useStyles();

  return (
    <OutlinedInput
      classes={{ focused: classes.focused, notchedOutline: classes.notchedOutline }}
      className={classes.input}
      endAdornment={<SearchIcon className={classes.searchIcon} />}
      type="text"
      placeholder="Buscar"
      size="small"
      {...props}
    />
  );
};
