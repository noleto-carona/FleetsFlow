import React from 'react';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <Sidebar />
      <main className="flex-1 ml-64 relative overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
