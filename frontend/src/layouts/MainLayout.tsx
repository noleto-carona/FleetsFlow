import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <Header />
      <Sidebar />
      <main className="flex-1 ml-64 relative pt-[104px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
