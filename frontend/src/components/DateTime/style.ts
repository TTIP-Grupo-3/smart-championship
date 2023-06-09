import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

export const useStyles = makeStyles()((theme: Theme) => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  input: {
    color: theme.palette.common.white,
  },
  toolbar: {
    '& .MuiTypography-root': {
      color: alpha(theme.palette.common.white, 0.4),
    },
    '& .MuiPickersToolbarText-root.Mui-selected': {
      color: theme.palette.common.white,
    },
  },
  timeIcon: {
    color: 'white',
  },
  dialogCalendarPaper: {
    height: '80vw',
    '& .MuiPickersCalendarHeader-label': {
      color: 'white',
    },
    '& .MuiYearCalendar-root': {
      color: 'white',
    },
    '& .MuiPickersDay-root': {
      color: 'white',
    },
    '& .MuiDayCalendar-weekDayLabel': {
      color: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
    '& .MuiClockNumber-root': {
      color: 'white',
    },
    '& .MuiDialog-container': {
      height: '105vh',
    },
  },
}));
