import React, { ReactNode } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

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

