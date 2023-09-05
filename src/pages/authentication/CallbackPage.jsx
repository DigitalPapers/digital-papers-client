import { Skeleton, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export function CallbackPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />;
  }

  return isLoading ? (
    <Typography variant="h5" component="p">
      🛸Cargando aplicación...
    </Typography>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
