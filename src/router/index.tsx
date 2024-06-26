import { AuthPage } from 'pages/AuthPage';
import { CatalogPage } from 'pages/CatalogPage/CatalogPage';
import { CreatePage } from 'pages/CreateEditPage/CreatePage';
import { EditPage } from 'pages/CreateEditPage/EditPage';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { ProductPage } from 'pages/ProductPage/ProductPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Root } from '../features/core/Root';
import { MainPage } from '../pages/MainPage/MainPage';
import { ROUTES } from './routes';


export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.AUTH,
        element: <AuthPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.CREATE,
        element: <CreatePage />,
      },
      {
        path: `${ROUTES.PRODUCT}`,
        element: <ProductPage />,
      },
      {
        path: `${ROUTES.CATALOG}`,
        element: <CatalogPage />,
      },
      {
        path: `${ROUTES.EDIT}`,
        element: <EditPage />,
      },
      {
        path: `${ROUTES.ERROR}`,
        element: <ErrorPage />,
      },
    ],
  },
]);
