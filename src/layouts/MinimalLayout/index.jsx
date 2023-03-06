import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

export default function MinimalLayout() {
  const { user } = useAuth()

  if (user) {
    console.log('Minimal layout there is  authenticated')
    return <Navigate to={'/'}></Navigate>
  }

  return (
    <Outlet />
  )
}