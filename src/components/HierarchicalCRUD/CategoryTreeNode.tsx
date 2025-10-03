import React from 'react';
import { Tag } from 'antd';
import { FolderOutlined, FileOutlined } from '@ant-design/icons';
import { CategoryNode } from './types';

interface CategoryTreeNodeProps {
  node: CategoryNode;
}

const CategoryTreeNode: React.FC<CategoryTreeNodeProps> = ({ node }) => {
  return (
    <span>
      {node.level === 1 ? <FolderOutlined /> : <FileOutlined />}{' '}
      <strong>{node.name}</strong>
      {node.details && node.details.length > 0 && (
        <Tag color="blue" style={{ marginLeft: 8 }}>
          {node.details.length} chi tiết
        </Tag>
      )}
    </span>
  );
};

export default CategoryTreeNode;
