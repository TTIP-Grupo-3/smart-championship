import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton, ListItemIcon, Typography } from '@mui/material';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const team = [
    { name: 'Lionel Messi', number: 10 },
    { name: 'Adrian Cardozo', number: 5 },
    { name: 'Diego Moronha', number: 1 },
  ];

  return (
    <List dense sx={{ width: '94%', bgcolor: 'black', margin: 2, borderRadius: '4px' }}>
      <Grid
        container
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          padding: 0,
          margin: 0,
          alignItems: 'center',
        }}
      >
        <ListItemIcon>
          <IconButton>
            <DeleteIcon style={{ fill: 'white' }}></DeleteIcon>
          </IconButton>
        </ListItemIcon>
        <ListItemText style={{ width: '0px', paddingLeft: 20 }}>
          <Typography color="white">N°</Typography>
        </ListItemText>
        <ListItemText style={{ display: 'flex', paddingLeft: 0 }}>
          <Typography color="white" style={{ textAlign: 'center' }}>
            Nombre
          </Typography>
        </ListItemText>
      </Grid>

      {team.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={index} disablePadding>
            <ListItemIcon>
              <Checkbox
                style={{ paddingLeft: '20px' }}
                edge="start"
                color="secondary"
                onChange={handleToggle(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
                icon={<CheckBoxOutlineBlankOutlined style={{ color: 'white' }} />}
              />
            </ListItemIcon>
            <ListItemButton>
              <Grid
                container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                <ListItemText style={{ width: '0px' }}>
                  <Typography color="white">{value.number}</Typography>
                </ListItemText>
                <ListItemText>
                  <Typography color="white" textAlign={'left'} paddingLeft={2}>
                    {value.name}
                  </Typography>
                </ListItemText>
              </Grid>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
