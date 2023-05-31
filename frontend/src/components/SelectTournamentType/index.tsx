import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FC } from 'react';
import { useStyles } from './style';

const numbers = ['Eliminación', 'Clasificación'];

export const SelectTournamentType: FC<any> = ({ value, onChange }) => {
  const { classes } = useStyles();

  return (
    <div>
      <FormControl sx={{ m: 1, mt: 3, width: '100%', margin: 0 }}>
        <Select
          sx={{
            '& fieldset': { border: 'none' },
          }}
          variant="outlined"
          native={false}
          value={value}
          disableUnderline
          onChange={onChange}
          className={classes.selectStyle}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                classes: { root: classes.menuItemStyle },
              },
              elevation: 0,
            },
          }}
        >
          {numbers.map((num, index) => (
            <MenuItem key={num} value={index + 1}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
