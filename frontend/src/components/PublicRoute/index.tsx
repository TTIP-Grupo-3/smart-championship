import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roles } from '../../pages/Login';
import { API_AUTH } from '../../services/Auth';

export const PublicRoute: FC<any> = ({ children, role, redirectTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    API_AUTH.profile().then(({ data: { role } }: any) => {
      if (!!localStorage.getItem('token')) {
        navigate(roles[role]);
      }
    });
  }, []);

  return children;
};
