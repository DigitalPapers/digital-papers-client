import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { routesMap } from '../../../routes/routes-map.js';

export const mainListItems = (
  <>
    <Link
      component={RouterLink}
      to={routesMap.get('dashboard').get('home').path}
      underline="none"
      color="inherit"
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
    </Link>
    <Link
      component={RouterLink}
      to={routesMap.get('dashboard').get('list').path}
      underline="none"
      color="inherit"
    >
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
    </Link>
  </>
);
