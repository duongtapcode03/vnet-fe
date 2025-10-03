import React from 'react';
import { Card, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SkillDetail } from '@/services/mockSkillData';

interface DetailCardProps {
  detail: SkillDetail;
  onEdit: (detail: SkillDetail) => void;
  onDelete: (detailId: string) => void;
}

const DetailCard: React.FC<DetailCardProps> = ({ detail, onEdit, onDelete }) => {
  return (
    <Card
      key={detail.id}
      size="small"
      style={{ background: '#f8fafc' }}
      extra={
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(detail)}
          />
          <Popconfirm
            title="Xóa chi tiết?"
            onConfirm={() => onDelete(detail.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      }
    >
      <p><strong>Cấp độ:</strong> {detail.skill_level}</p>
      <p><strong>Yêu cầu:</strong></p>
      <ul>
        {(detail.requirements || []).map((req: any, idx: number) => (
          <li key={idx}>{req.value}</li>
        ))}
      </ul>
    </Card>
  );
};

export default DetailCard;
