import React from 'react';
import { Card, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SkillDetail } from '@/services/mockSkillData';
import DetailCard from './DetailCard';

interface DetailsSectionProps {
  details: SkillDetail[];
  onAddDetail: () => void;
  onEditDetail: (detail: SkillDetail) => void;
  onDeleteDetail: (detailId: string) => void;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  details,
  onAddDetail,
  onEditDetail,
  onDeleteDetail,
}) => {
  return (
    <Card
      size="small"
      title="Chi tiết kỹ năng"
      extra={
        <Button
          size="small"
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddDetail}
        >
          Thêm chi tiết
        </Button>
      }
      style={{ marginTop: 16 }}
    >
      {details && details.length > 0 ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          {details.map(detail => (
            <DetailCard
              key={detail.id}
              detail={detail}
              onEdit={onEditDetail}
              onDelete={onDeleteDetail}
            />
          ))}
        </Space>
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>
          Chưa có chi tiết nào
        </p>
      )}
    </Card>
  );
};

export default DetailsSection;
