import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FC } from 'react';
import { useStyles } from './style';

export const SelectorNumber: FC<any> = ({ options, isTeamSelector, ...props }) => {
  const { classes } = useStyles();

  return (
    <div>
      <FormControl sx={{ m: 1, mt: 3, margin: 0, width: isTeamSelector ? '100%' : 'auto' }}>
        <Select
          sx={{
            '& fieldset': { border: 'none' },
          }}
          variant="outlined"
          native={false}
          disableUnderline
          className={classes.selectStyle}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                classes: { root: classes.menuItemStyle },
              },
              elevation: 0,
            },
          }}
          {...props}
        >
          {options.map((num: any) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
