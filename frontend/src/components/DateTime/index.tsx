import { inputLabelClasses } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { FC } from 'react';
import { useStyles } from './style';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const DateTime: FC<any> = (props) => {
  const { classes } = useStyles();

  return (
    <MobileDateTimePicker
      ampm={false}
      slotProps={{
        textField: {
          InputProps: {
            classes: { notchedOutline: classes.notchedOutline, input: classes.input },
          },
          InputLabelProps: {
            sx: {
              color: 'white',
              [`&.${inputLabelClasses.shrink}`]: {
                color: 'white',
              },
            },
          },
        },
        toolbar: {
          className: classes.toolbar,
        },
        tabs: {
          timeIcon: <AccessTimeIcon style={{ color: 'white' }} />,
          dateIcon: <CalendarTodayIcon style={{ color: 'white' }} />,
        },
        dialog: {
          className: classes.dialogCalendarPaper,
        },
      }}
      {...props}
    />
  );
};
