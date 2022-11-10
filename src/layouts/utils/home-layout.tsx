import ContainerBody from '@layout/main/body';
import React from 'react';
import Header from '@layout/main/header';

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full relative overflow-x-hidden">
      <Header />
      <ContainerBody>{children}</ContainerBody>
    </div>
  );
};

export default HomeLayout;
