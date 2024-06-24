import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { router } from './router';
import { rootStore } from 'store';
import { YMaps } from '@pbe/react-yandex-maps';
import 'react-photo-view/dist/react-photo-view.css';

export const App = () => {
  return (
    <Provider store={rootStore}>
      <YMaps query={{apikey: '6da18fda-a290-4012-8918-26eb890d92db'}}>
        <RouterProvider router={router} />
      </YMaps>
    </Provider>
  );
};
