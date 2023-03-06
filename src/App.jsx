import Routes from './routes'
import { AuthProvider } from './hooks/AuthProvider'
export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}