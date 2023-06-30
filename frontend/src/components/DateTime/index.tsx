import { inputLabelClasses, useTheme } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { FC } from 'react';
import { useStyles } from './style';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const DateTime: FC<any> = (props) => {
  const { classes } = useStyles();
  const theme = useTheme();

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
              color: theme.palette.common.white,
              [`&.${inputLabelClasses.shrink}`]: {
                color: theme.palette.common.white,
              },
            },
          },
        },
        toolbar: {
          className: classes.toolbar,
        },
        tabs: {
          timeIcon: <AccessTimeIcon style={{ color: theme.palette.common.white }} />,
          dateIcon: <CalendarTodayIcon style={{ color: theme.palette.common.white }} />,
        },
        dialog: {
          className: classes.dialogCalendarPaper,
        },
      }}
      {...props}
    />
  );
};
