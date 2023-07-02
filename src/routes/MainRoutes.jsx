import MainLayout from "../layouts/MainLayout/MainLayout";
import Customers from "../pages/Customers";
import { Files } from "../pages/Files";
import FilesUpload from "../pages/FileUploader/FilesUpload";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <FilesUpload />,
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
