import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: FC<any> = ({ children, role, redirectTo }) => {
  const isRoleValid = () => {
    return !!localStorage.getItem('token');
  };

  return !role || isRoleValid() ? children : <Navigate to={redirectTo} />;
};
