import { Spin } from 'antd';
import React from 'react';
import { useSystemContext } from '@context/system';

const Loading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useSystemContext();

  return (
    <Spin spinning={loading}>
      <div className="w-full min-h-screen relative">{children}</div>
    </Spin>
  );
};

export default Loading;
