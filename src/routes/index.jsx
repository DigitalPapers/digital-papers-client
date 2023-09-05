import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { AuthLayout } from '../layouts/AuhLayout/AuthLayout.jsx';

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [LoginRoutes, MainRoutes],
    },
  ]);
  return <RouterProvider router={router} />;
}
