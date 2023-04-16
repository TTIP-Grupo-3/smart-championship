import { Grid, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useState, useRef } from 'react';
import { useStyles } from './style';

interface TooltipTextProps {
  text: string;
  disabled?: boolean;
  'data-testid'?: string;
}

export const TooltipText: FC<TooltipTextProps> = (props) => {
  const { text, disabled = false, 'data-testid': dataTestId = 'TooltipText' } = props;
  const [showTooltip, setShowTooltiop] = useState<boolean>(true);
  const ref = useRef<HTMLElement>(document.createElement('div'));
  const { classes } = useStyles();

  const isOverflowed = (): boolean => ref.current.clientWidth < ref.current.scrollWidth;
  useEffect(() => setShowTooltiop(!isOverflowed()), [ref]);

  return (
    <Tooltip
      data-testid={dataTestId}
      title={<Typography>{text}</Typography>}
      disableHoverListener={showTooltip}
    >
      <Grid className={classes.grid}>
        <Typography
          data-testid="tooltipText-typography"
          variant="body2"
          className={disabled ? classes.disabled : classes.typography}
          noWrap
          ref={ref}
        >
          {text}
        </Typography>
      </Grid>
    </Tooltip>
  );
};
