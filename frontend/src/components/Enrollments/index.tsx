import { FC } from 'react';
import { AdminEnrollmentCard } from '../AdminEnrollmentCard';
import { EmptyData } from '../EmptyData';
import { Loader } from '../Loader';
import Scroll from '../Scroll';
import { useStyles } from './style';

export const Enrollments: FC<any> = ({ enrollments, handleOpen, isLoading, checked }) => {
  const { classes } = useStyles();

  return (
    <>
      {isLoading ? (
        <Loader text="Cargando inscripciones" />
      ) : !enrollments.length ? (
        <EmptyData emptyText="No hay inscripciones aqui" />
      ) : (
        <Scroll className={classes.scroll}>
          {enrollments.map((enrollment: any) => (
            <AdminEnrollmentCard key={enrollment.id} {...{ ...enrollment, handleOpen, checked }} />
          ))}
        </Scroll>
      )}
    </>
  );
};
