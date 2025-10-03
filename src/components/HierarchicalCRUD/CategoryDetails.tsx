import React from 'react';
import { Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CategoryNode } from './types';
import { SkillDetail } from '@/services/mockSkillData';
import ActionButton from './ActionButton';
import DetailsSection from './DetailsSection';

interface CategoryDetailsProps {
  selectedNode: CategoryNode | null;
  onAddChild: (parentId: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddDetail: () => void;
  onEditDetail: (detail: SkillDetail) => void;
  onDeleteDetail: (detailId: string) => void;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  selectedNode,
  onAddChild,
  onEdit,
  onDelete,
  onAddDetail,
  onEditDetail,
  onDeleteDetail,
}) => {
  if (!selectedNode) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        Chọn một mục từ cây bên trái để xem chi tiết
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p><strong>Tên:</strong> {selectedNode.name}</p>
        <p><strong>Mã:</strong> {selectedNode.code || 'N/A'}</p>
        <p><strong>Cấp độ:</strong> {selectedNode.level}</p>
        <p><strong>Thứ tự:</strong> {selectedNode.order_index}</p>
        {selectedNode.description && (
          <p><strong>Mô tả:</strong> {selectedNode.description}</p>
        )}
      </div>

      <Space style={{ marginBottom: 16 }}>
        <ActionButton
          icon={<PlusOutlined />}
          onClick={() => onAddChild(selectedNode.id)}
          label="Thêm con"
        />
        <ActionButton
          icon={<EditOutlined />}
          onClick={onEdit}
          label="Sửa"
        />
        <Popconfirm
          title="Xóa danh mục"
          description="Bạn có chắc chắn muốn xóa danh mục này và tất cả các mục con?"
          onConfirm={onDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <ActionButton
            danger
            icon={<DeleteOutlined />}
            label="Xóa"
          />
        </Popconfirm>
      </Space>

      <DetailsSection
        details={selectedNode.details || []}
        onAddDetail={onAddDetail}
        onEditDetail={onEditDetail}
        onDeleteDetail={onDeleteDetail}
      />
    </div>
  );
};

export default CategoryDetails;
