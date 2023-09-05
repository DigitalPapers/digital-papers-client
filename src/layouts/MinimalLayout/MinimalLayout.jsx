import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '../../pages/PageLoader.jsx';

export function MinimalLayout() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <PageLoader />;
  }

  return <Outlet />;
}
