import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    }
  ]
}

export default MainRoutes;