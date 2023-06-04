import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

export const useStyles = makeStyles()((theme: Theme) => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  title: { borderBottom: `1px solid ${theme.palette.grey[500]}` },
  root: {
    marginTop: 16,
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  input: {
    color: theme.palette.common.white,
  },
  scroll: { height: '60vh', marginRight: '4px', paddingInline: 20 },
  confirmButton: {
    backgroundColor: '#1990BB',
    fontWeight: 600,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#1990BB',
    },
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
  },
}));
