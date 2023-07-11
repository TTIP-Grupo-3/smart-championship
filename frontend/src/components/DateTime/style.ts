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
    color: theme.palette.common.white,
  },
  dialogCalendarPaper: {
    height: '80vw',
    '& .MuiPickersCalendarHeader-label': {
      color: theme.palette.common.white,
    },
    '& .MuiYearCalendar-root': {
      color: theme.palette.common.white,
    },
    '& .MuiPickersDay-root': {
      color: theme.palette.common.white,
    },
    '& .MuiDayCalendar-weekDayLabel': {
      color: theme.palette.common.white,
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
    '& .MuiClockNumber-root': {
      color: theme.palette.common.white,
    },
    '& .MuiDialog-container': {
      height: '105vh',
    },
  },
}));
