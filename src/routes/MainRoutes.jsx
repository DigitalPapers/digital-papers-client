import MainLayout from '../layouts/MainLayout/MainLayout';
import Customers from '../pages/Customers';
import { Files } from '../pages/Files';
import FilesUpload from '../pages/FileUploader/FilesUpload';
import { routesMap } from './routes-map.js';

const MainRoutes = {
  path: routesMap.get('home').path,
  element: <MainLayout />,
  children: [
    {
      path: routesMap.get('home').path,
      element: <FilesUpload />,
    },
    {
      path: routesMap.get('clients').get('list').path,
      element: <Customers />,
    },
    {
      path: routesMap.get('clients').get('list-docs').path,
      element: <Files />,
    },
  ],
};

export default MainRoutes;
