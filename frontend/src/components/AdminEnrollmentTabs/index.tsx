/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppBar, Box, Grid, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStyles } from './style';
import { API_ADMIN_ENROLLMENT } from '../../services/AdminEnrollment';
import { useParams } from 'react-router-dom';
import { Enrollments as CheckedEnrollments } from '../Enrollments';
import { Enrollments as PendingEnrollments } from '../Enrollments';
import { DialogEnrollment } from '../DialogEnrollment';
import { useSnackbar } from '../../hooks/useSnackbar';

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
      style={{ height: '60vh' }}
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

export const AdminEnrollmentTabs = () => {
  const [value, setValue] = useState(0);
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [idEnroll, setIdEnroll] = useState<any>();
  const { Snack, onSuccess, onError } = useSnackbar();
  const { championshipId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      API_ADMIN_ENROLLMENT.getAdminEnrollments(+championshipId!).then(({ data }) => {
        setEnrollments(data);
        setIsLoading(false);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onClose = () => setOpen(false);
  const handleOpen = (id: number) => {
    setIdEnroll(id);
    setOpen(true);
  };

  const reload = async () => {
    API_ADMIN_ENROLLMENT.getAdminEnrollments(+championshipId!).then((r: any) => setEnrollments(r.data));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const pendingEnrollments = enrollments.filter((e: any) => e.status === 'to_review');

  const reviewedEnrollments = enrollments.filter((e: any) => e.status !== 'to_review');

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
            <Tab classes={{ root: classes.tab }} label="Pendientes" {...a11yProps(0)} />
            <Tab classes={{ root: classes.tab }} label="Revisadas" {...a11yProps(1)} />
          </Tabs>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PendingEnrollments {...{ handleOpen, isLoading }} enrollments={pendingEnrollments} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CheckedEnrollments
          {...{ handleOpen, isLoading }}
          enrollments={reviewedEnrollments}
          checked={true}
        />
      </TabPanel>
      {open && (
        <DialogEnrollment
          open={open}
          {...{ onClose, onError, onSuccess, idEnroll, reload }}
          championshipId={+championshipId!}
        />
      )}
      <Snack />
    </div>
  );
};
