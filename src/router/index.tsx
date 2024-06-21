import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Root } from '../features/core/Root';
import { MainPage } from '../pages/MainPage/MainPage';
import { ROUTES } from './routes';
import { ProductPage } from 'pages/ProductPage';
import { CatalogPage } from 'pages/CatalogPage';
import { AuthPage } from 'pages/AuthPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { CreatePage } from 'pages/CreatePage';
import { ErrorPage } from 'pages/ErrorPage';
import { EditPage } from 'pages/EditPage';

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
        path: `${ROUTES.PRODUCT}/:id`,
        element: <ProductPage />,
      },
      {
        path: `${ROUTES.CATALOG}`,
        element: <CatalogPage />,
      },
      {
        path: `${ROUTES.EDIT}/:id`,
        element: <EditPage />,
      },
      {
        path: `${ROUTES.ERROR}`,
        element: <ErrorPage />,
      }
    ],
  },
]);
