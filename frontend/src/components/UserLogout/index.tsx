import { Avatar, Grid, IconButton, PopoverPosition, Typography } from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { Logout as LogoutIcon, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import { getInitials } from '../../utils/utils';
import { roles } from '../../pages/Login';

const avatarColor: any = { admin: '#1990BB', reviewer: 'rgb(191, 54, 12)', team_leader: 'blue' };

export const UserLogout: FC<any> = ({ isLogged, userData, ...restProps }) => {
  const menuWidth = 178;
  const { classes } = useStyles({ menuWidth });
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const close = (): void => {
    setAnchorEl(null);
  };

  const openUserMenu = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

  const openHome = (event: MouseEvent<HTMLElement>): void => {
    navigate(roles[userData.role]);
    setAnchorEl(null);
  };

  const logout = (): void => {
    localStorage.clear();
    navigate('/login');
  };

  const anchorPosition = (): PopoverPosition => {
    const rect = anchorEl?.getBoundingClientRect();
    return {
      left: rect ? rect.left + rect.width - menuWidth : 0,
      top: rect ? rect.top + rect.height : 0,
    };
  };

  return (
    <Grid {...restProps}>
      <IconButton className={classes.button} onClick={openUserMenu}>
        <PersonIcon />
        <ExpandMoreIcon className={classes.arrow} />
      </IconButton>

      <Menu
        keepMounted
        open={open}
        onClose={close}
        anchorPosition={anchorPosition()}
        anchorReference="anchorPosition"
      >
        {isLogged ? (
          <>
            <Grid container direction="row" alignItems="center" style={{ paddingBottom: 10 }}>
              <Avatar className={classes.avatar} style={{ backgroundColor: avatarColor[userData.role] }}>
                {getInitials(userData.username).toUpperCase()}
              </Avatar>
              <Typography padding={1} color="white" variant="body1">
                {userData.username}
              </Typography>
            </Grid>
            {userData.role !== 'reviewer' && (
              <MenuItem className={classes.menuitem} onClick={openHome}>
                <HomeIcon className={classes.icon} />
                <Typography variant="body2" className={classes.text} noWrap>
                  Inicio
                </Typography>
              </MenuItem>
            )}
            <MenuItem className={classes.menuitem} onClick={logout}>
              <LogoutIcon className={classes.icon} />
              <Typography variant="body2" className={classes.text} noWrap>
                Cerrar Sesión
              </Typography>
            </MenuItem>
          </>
        ) : (
          <MenuItem className={classes.menuitem} onClick={logout}>
            <LoginIcon className={classes.icon} />
            <Typography variant="body2" className={classes.text} noWrap>
              Iniciar Sesión
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Grid>
  );
};
