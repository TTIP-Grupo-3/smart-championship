import { CSSProperties, FC, ReactNode } from 'react';
import { useStyles } from './style';

export interface ScrollProps {
  height?: string;
  marginTop?: string;
  show?: boolean;
  style?: CSSProperties;
  className?: string;
  'data-testid'?: string;
  children: ReactNode;
}

const Scroll: FC<ScrollProps> = ({
  children,
  height,
  marginTop,
  show = true,
  style,
  className,
  ...restOfProps
}) => {
  const { classes, cx } = useStyles();

  return (
    <div
      data-testid="scroll"
      {...restOfProps}
      className={show ? cx(classes.root, className) : ''}
      style={{ height: height, marginTop: marginTop, ...style }}
    >
      {children}
    </div>
  );
};
export default Scroll;
