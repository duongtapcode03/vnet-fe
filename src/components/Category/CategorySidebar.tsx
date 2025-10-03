import React from 'react';
import { Tree, Button, Card, Tag, Space, Dropdown, message } from 'antd';
import { PlusOutlined, FolderOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import { Category } from '@/types';
import { useGetCategoriesMutation, useDeleteCategoryMutation } from '@/services/api/categoryApi';
import { handleApiError, handleApiSuccess, handleApiWarning } from '@/utils/errorHandler';

interface TreeNode extends Category {
  children: TreeNode[];
}

interface CategorySidebarProps {
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  showDeleted: boolean;
  onToggleShowDeleted: (show: boolean) => void;
  onDataChange: () => void;
  onCreateCategory: (parentId: number | null) => void;
  onEditCategory: (category: Category) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategoryId,
  onSelectCategory,
  showDeleted,
  onToggleShowDeleted,
  onDataChange,
  onCreateCategory,
  onEditCategory
}) => {
  // Sử dụng RTK Query để lấy dữ liệu categories
  const [getCategories, { 
    data: categoriesData, 
    isLoading,
    reset
  }] = useGetCategoriesMutation();

  const [deleteCategory] = useDeleteCategoryMutation();

  // Trigger the mutation to fetch categories on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await getCategories({ 
          page: 0, 
          size: 100,
          sortBy: "id",
          sortDescription: "asc"
        }).unwrap();
      } catch (error: any) {
        handleApiError(error, 'Không thể tải danh sách danh mục. Vui lòng thử lại');
      }
    };
    
    fetchData();
  }, [getCategories]);

  const buildTree = (items: Category[]): TreeNode[] => {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    items.forEach(item => {
      map.set(item.id, { ...item, children: [] });
    });

    items.forEach(item => {
      const node = map.get(item.id)!;
      const parentId = item.parentId === null ? null : Number(item.parentId);
      if (parentId === null) {
        roots.push(node);
      } else {
        const parent = map.get(parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return roots;
  };

  // Xử lý dữ liệu categories
  const categories = React.useMemo(() => {
    if (!categoriesData?.data?.content) return [];
    
    const filteredData = showDeleted 
      ? categoriesData.data.content 
      : categoriesData.data.content.filter(cat => cat.isDeleted === "0");
    
    return buildTree(filteredData);
  }, [categoriesData, showDeleted]);

  const handleDelete = async (categoryId: number) => {
    try {
      console.log('handleDelete', categoryId);
      
      await deleteCategory(categoryId).unwrap();
      handleApiSuccess('Xóa danh mục thành công');
      onDataChange();
      
      // Refetch data
      try {
        await getCategories({ 
          page: 0, 
          size: 100,
          sortBy: "id",
          sortDescription: "asc"
        }).unwrap();
      } catch (refetchError) {
        handleApiWarning('Danh mục đã được xóa nhưng không thể cập nhật danh sách. Vui lòng refresh trang.');
      }
    } catch (error: any) {
      handleApiError(error, 'Có lỗi xảy ra khi xóa danh mục. Vui lòng thử lại');
    }
  };

  const buildTreeData = (nodes: TreeNode[]): DataNode[] => {
    return nodes.map(node => {
      const menuItems = [
        {
          key: 'add-child',
          label: 'Thêm danh mục con',
          icon: <PlusOutlined />,
          onClick: () => onCreateCategory(node.id)
        },
        {
          key: 'edit',
          label: 'Sửa danh mục',
          icon: <EditOutlined />,
          onClick: () => onEditCategory(node),
          disabled: node.editable === "0"
        },
        {
          key: 'delete',
          label: 'Xóa danh mục',
          icon: <DeleteOutlined />,
          onClick: () => handleDelete(node.id),
          disabled: node.editable === "0"
        }
      ];

      return {
        key: node.id,
        title: (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span style={{ marginRight: 8 }}>{node.categoryName}</span>
              <Space size={4}>
                <Tag color={node.editable === "1" ? "green" : "red"} size="small">
                  {node.editable === "1" ? "Sửa được" : "Không sửa"}
                </Tag>
                {node.isDeleted === "1" && (
                  <Tag color="red" size="small">Đã xóa</Tag>
                )}
              </Space>
            </div>
            <Dropdown
              menu={{ items: menuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button 
                type="text" 
                size="small" 
                icon={<MoreOutlined />}
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          </div>
        ),
        children: buildTreeData(node.children),
        icon: node.children.length > 0 ? <FolderOutlined /> : undefined,
      };
    });
  };

  const treeData: DataNode[] = buildTreeData(categories);
  console.log('treeData', treeData);

  const handleCreate = (parentId: number | null = null) => {
    onCreateCategory(parentId);
  };

  return (
    <Card 
      title="Danh mục sản phẩm" 
      style={{ height: '80vh' }}
      extra={
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleCreate(null)}
          >
            Thêm danh mục
          </Button>
        </Space>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: '12px', color: '#666' }}>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => onToggleShowDeleted(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Hiển thị đã xóa
        </label>
      </div>

      <div
        onClick={() => onSelectCategory(null)}
        style={{
          padding: '8px 12px',
          marginBottom: 8,
          borderRadius: 6,
          cursor: 'pointer',
          backgroundColor: selectedCategoryId === null ? '#e6f7ff' : 'transparent',
          border: selectedCategoryId === null ? '1px solid #1890ff' : '1px solid transparent',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (selectedCategoryId !== null) {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedCategoryId !== null) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 500 }}>Tất cả sản phẩm</span>
      </div>

      <Tree
        treeData={treeData}
        defaultExpandAll
        selectedKeys={selectedCategoryId ? [selectedCategoryId.toString()] : []}
        onSelect={(keys) => {
          const id = keys[0] ? Number(keys[0]) : null;
          onSelectCategory(id);
        }}
        onExpand={() => {
          // Handle expand if needed
        }}
        style={{ 
          marginBottom: 16,
          backgroundColor: 'transparent'
        }}
        showIcon
        blockNode
      />

      {categories.length === 0 && !isLoading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '32px 16px', 
          color: '#999',
          fontSize: '14px'
        }}>
          Không có dữ liệu
        </div>
      )}
    </Card>
  );
};

export default CategorySidebar;
