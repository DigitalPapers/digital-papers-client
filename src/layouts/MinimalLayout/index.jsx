import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function MinimalLayout() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    console.log('Minimal layout there is  authenticated');
    return <Navigate to={'/'}></Navigate>;
  }

  return <Outlet />;
}
