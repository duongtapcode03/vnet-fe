import React, { useState } from "react";
import { Row, Col } from "antd";
import { Category } from "@/types";
import CategorySidebar from "@/components/Category/CategorySidebar";
import ProductTable from "@/components/Category/ProductTable";
import CategoryModal from "@/components/Category/CategoryModal";

// ======== COMPONENT ========
const UnitTreeCRUD: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);
  
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);

  // Event handlers
  const handleSelectCategory = (categoryId: number | null) => {
    if (categoryId === null) {
      setSelectedCategory(null);
    } else {
      // Category sẽ được lấy từ CategorySidebar component
      setSelectedCategory({ id: categoryId } as Category);
    }
  };

  const handleDataChange = () => {
    console.log('Data changed');
  };

  const handleCreateCategory = (parentId: number | null) => {
    setParentId(parentId);
    setModalMode('create');
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setParentId(null);
    setModalMode('edit');
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setParentId(null);
  };

  const handleModalSuccess = () => {
    // Data will be refetched by the modal
    console.log('Modal operation successful');
  };

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={20}>
        {/* Category Sidebar - Left Side */}
        <Col span={8}>
          <CategorySidebar
            selectedCategoryId={selectedCategory?.id || null}
            onSelectCategory={handleSelectCategory}
            showDeleted={showDeleted}
            onToggleShowDeleted={setShowDeleted}
            onDataChange={handleDataChange}
            onCreateCategory={handleCreateCategory}
            onEditCategory={handleEditCategory}
          />
        </Col>

        {/* Product Table - Right Side */}
        <Col span={16}>
          <ProductTable
            selectedCategoryId={selectedCategory?.id || null}
            showDeleted={showDeleted}
            onDataChange={handleDataChange}
          />
        </Col>
      </Row>

      {/* Category Modal */}
      <CategoryModal
        visible={modalVisible}
        onClose={handleModalClose}
        category={editingCategory}
        parentId={parentId}
        mode={modalMode}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default UnitTreeCRUD;