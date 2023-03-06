import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

export default function MainLayout() {
  const { user } = useAuth();

  if (!user) {
    console.log('Main layout there is not authenticated')
    return <Navigate to={'/login'}></Navigate>
  }

  return (
    <Outlet />
  )
}