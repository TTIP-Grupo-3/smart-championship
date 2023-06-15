import { FC } from 'react';
import { AdminEnrollmentCard } from '../AdminEnrollmentCard';
import { EmptyData } from '../EmptyData';
import { Loader } from '../Loader';
import Scroll from '../Scroll';
import { useStyles } from './style';

export const Enrollments: FC<any> = ({ enrollments, handleOpen, isLoading }) => {
  const { classes } = useStyles();

  const extra = {
    username: 'Diego Moronha',
    created_at: new Date().toISOString(),
    tournamentRequested: 'Torneo futbol 11',
    type: 'Clasificacion',
  };

  return (
    <>
      {isLoading ? (
        <Loader text="Cargando inscripciones" />
      ) : !enrollments.length ? (
        <EmptyData emptyText="No hay inscripciones aqui" />
      ) : (
        <Scroll className={classes.scroll}>
          {enrollments.map((enrollment: any) => (
            <AdminEnrollmentCard key={enrollment.id} {...{ ...enrollment, ...extra, handleOpen }} />
          ))}
        </Scroll>
      )}
    </>
  );
};
