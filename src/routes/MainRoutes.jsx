import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import Customers from "../pages/Customers";
import { Files } from "../pages/Files";
import { ClientsService } from "../services/clients.service";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/customers",
      element: <Customers />,
    },
    {
      path: "/customers/:id/files",
      element: <Files />,
    },
  ],
};

export default MainRoutes;
