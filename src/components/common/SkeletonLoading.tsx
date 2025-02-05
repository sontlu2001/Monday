import React from 'react';
import { Card, Skeleton, Space } from 'antd';

const SkeletonLoading = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Skeleton active title={{ width: '50%' }} paragraph={false} />
      </Card>
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} style={{ marginTop: 16 }}>
          <Skeleton
            active
            title={{ width: '50%' }}
            paragraph={{ rows: 1, width: '100%' }}
          />
        </Card>
      ))}
    </Space>
  );
};

export default SkeletonLoading;
