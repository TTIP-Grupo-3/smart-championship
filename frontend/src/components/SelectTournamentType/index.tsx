import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FC } from 'react';
import { useStyles } from './style';
import { TypesTournament } from '../CardTournament';

const types: TypesTournament = { elimination: 'Eliminación', score: 'Clasificación' };

export const SelectTournamentType: FC<any> = ({ value, onChange, name }) => {
  const { classes } = useStyles();

  return (
    <div>
      <FormControl sx={{ m: 1, mt: 3, width: '100%', margin: 0 }}>
        <Select
          sx={{
            '& fieldset': { border: 'none' },
          }}
          variant="outlined"
          name={name}
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
          {Object.keys(types).map((key: string, index) => (
            <MenuItem key={index} value={key}>
              {types[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
