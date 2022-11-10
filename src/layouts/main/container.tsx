import React from 'react';

const Container: React.FC<any> = ({ children, style }) => {
  return (
    <div className="w-full flex items-center justify-center" style={style}>
      <div className="max-w-7xl w-full relative">{children}</div>
    </div>
  );
};

export default Container;
