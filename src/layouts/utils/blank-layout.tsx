import React from 'react';

const BlankLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full relative">{children}</div>;
};

export default BlankLayout;
