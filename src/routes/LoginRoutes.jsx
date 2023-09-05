import { Login } from '../pages/authentication/Login';
import { CallbackPage } from '../pages/authentication/CallbackPage.jsx';
import { routesMap } from './routes-map.js';

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: routesMap.get('auth').get('login').path,
      element: <Login />,
    },
    {
      path: routesMap.get('auth').get('callback').path,
      element: <CallbackPage />,
    },
  ],
};

export default LoginRoutes;
