import React from 'react';

const ContainerBody: React.FC<any> = ({ children }) => {
  return <div className="w-full min-h-full pt-[50px] relative">{children}</div>;
};

export default ContainerBody;
