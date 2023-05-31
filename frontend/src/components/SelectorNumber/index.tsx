import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useState } from 'react';
import { useStyles } from './style';

export const SelectorNumber: FC<any> = ({ options, isTeamSelector, defaultOption }) => {
  const { classes } = useStyles();
  const [number, setNumber] = useState<number>(defaultOption);

  const handleChange = (event: SelectChangeEvent<typeof number>) => {
    const {
      target: { value },
    } = event;
    setNumber(+value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, mt: 3, margin: 0, width: isTeamSelector ? '100%' : 'auto' }}>
        <Select
          sx={{
            '& fieldset': { border: 'none' },
          }}
          variant="outlined"
          native={false}
          value={number}
          disableUnderline
          onChange={handleChange}
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
