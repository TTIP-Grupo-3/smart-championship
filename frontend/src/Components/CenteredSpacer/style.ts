import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => {
  const inlinegrid = { alignItems: 'center', display: 'flex', flexGrow: 1, width: '0px' };
  return {
    left: { ...inlinegrid, justifyContent: 'flex-start' },
    center: { alignItems: 'center', display: 'flex', width: 'auto' },
    right: { ...inlinegrid, justifyContent: 'flex-end' },
  };
});

export { useStyles };
