import { useOutlet } from "react-router-dom";
import { AuthProvider } from "../../hooks/AuthProvider";

export function AuthLayout() {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
}
