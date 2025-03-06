import React, { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='layout-container'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

