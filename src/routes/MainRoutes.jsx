import MainLayout from '../layouts/MainLayout/MainLayout';
import Customers from '../pages/Customers';
import { Files } from '../pages/Files';
import FilesUpload from '../pages/FileUploader/FilesUpload';
import { routesMap } from './routes-map.js';

const MainRoutes = {
  path: routesMap.get('dashboard').get('home').path,
  element: <MainLayout />,
  children: [
    {
      path: routesMap.get('dashboard').get('home').path,
      element: <FilesUpload />,
    },
    {
      path: routesMap.get('dashboard').get('list').path,
      element: <Customers />,
    },
    {
      path: routesMap.get('dashboard').get('list-docs').path,
      element: <Files />,
    },
  ],
};

export default MainRoutes;
