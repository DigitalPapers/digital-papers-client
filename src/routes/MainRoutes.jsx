import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import Customers from "../pages/Customers";
import { Files } from "../pages/Files";
import { ClientsService } from "../services/clients.service";
import FileUploader from "../pages/FileUploader/FileUploader";

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
    {
      path: "/customers/files/upload",
      element: <FileUploader />,
    },
  ],
};

export default MainRoutes;
