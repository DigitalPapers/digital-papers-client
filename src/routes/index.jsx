import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { AuthLayout } from '../layouts/AuhLayout/AuthLayout.jsx';
import ErrorPage from '../pages/Error/error-page.jsx';

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [...LoginRoutes, MainRoutes],
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
