import * as React from 'react';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './style';
import { TableClasification } from '../TableClasification';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ height: '70vh' }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export const ClasificationTournamentTabs = () => {
  const [value, setValue] = useState(0);
  const { classes } = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Grid container alignItems="center" justifyContent="center">
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            classes={{ indicator: classes.indicator }}
          >
            <Tab classes={{ root: classes.tab }} label="Clasificacion" {...a11yProps(0)} />
            <Tab classes={{ root: classes.tab }} label="Enfrentamientos" {...a11yProps(1)} />
          </Tabs>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TableClasification />{' '}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography color="white">Item TWO </Typography>
      </TabPanel>
    </div>
  );
};
