import { ReactNode } from 'react';
import { BaseContainer } from './base-container';
import { Footer } from './footer';
import { Header } from './header';


export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BaseContainer>
      <Header />
        <main>{children}</main>
      <Footer />
    </BaseContainer>
  );
};
