import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roles } from '../../pages/Login';
import { API_AUTH } from '../../services/Auth';

export const PrivateRoute: FC<any> = ({ children, role, redirectTo }) => {
  const ROLE = role;
  const navigate = useNavigate();

  useEffect(() => {
    API_AUTH.profile().then(({ data: { role } }: any) => {
      if (role !== ROLE && !!localStorage.getItem('token')) {
        navigate(roles[role]);
      }
    });
  }, []);

  return children;
};
