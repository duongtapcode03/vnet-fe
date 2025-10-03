import React from 'react';
import { Tree, Spin } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { CategoryNode } from './types';
import CategoryTreeNode from './CategoryTreeNode';

interface CategoryTreeProps {
  categories: CategoryNode[];
  selectedKeys: string[];
  loading: boolean;
  onSelect: (selectedKeys: React.Key[]) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  selectedKeys,
  loading,
  onSelect,
}) => {
  const convertToTreeData = (nodes: CategoryNode[]): DataNode[] => {
    return nodes.map(node => ({
      key: node.id,
      title: <CategoryTreeNode node={node} />,
      children: node.children && node.children.length > 0
        ? convertToTreeData(node.children)
        : undefined,
    }));
  };

  const treeData = convertToTreeData(categories);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Tree
      showLine
      showIcon
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      treeData={treeData}
      style={{ background: 'transparent' }}
    />
  );
};

export default CategoryTree;
