import { Outlet } from 'react-router-dom';
import { PageWrapper } from '../page-wrapper';
import { ScrollToTop } from 'shared/components/ScrollToTop';

export const Root = () => {
  return (
    <PageWrapper>
      <ScrollToTop />
      <Outlet />
    </PageWrapper>
  );
};
