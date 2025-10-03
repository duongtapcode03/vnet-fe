// Main HierarchicalCRUD component - chỉ quản lý state và logic
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { mockSkillAPI, SkillCategory, SkillDetail, flatDataUtils } from '@/services/mockSkillData';
import { CategoryNode, CategoryFormData, DetailFormData } from './types';
import CategoryTree from './CategoryTree';
import CategoryDetails from './CategoryDetails';
import CategoryForm from './CategoryForm';
import DetailForm from './DetailForm';
import ActionButton from './ActionButton';
import ExcelExportButton from './ExcelExportButton';

const HierarchicalCRUD: React.FC = () => {
  // State management
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<CategoryNode | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingDetail, setEditingDetail] = useState<SkillDetail | null>(null);

  // Forms
  const [form] = Form.useForm();
  const [detailForm] = Form.useForm();

  // Constants
  const skillLevels = [
    'Bậc 11',
    'Bậc 12',
    'Bậc 13 (CNTT12)',
    'Bậc 13 (CNTT24)',
    'Bậc 14',
    'Bậc 15',
  ];

  // Data loading
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const categoriesData = await mockSkillAPI.getCategories();
      const detailsData = await mockSkillAPI.getDetails();
      const tree = buildTree(categoriesData, detailsData);
      setCategories(tree);
    } catch (error) {
      console.error('Error loading data:', error);
      message.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const buildTree = (categories: SkillCategory[], details: SkillDetail[]): CategoryNode[] => {
    return flatDataUtils.buildTree(categories, details) as CategoryNode[];
  };

  const findNodeById = (nodes: CategoryNode[], id: string): CategoryNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Event handlers
  const onSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const nodeId = selectedKeys[0] as string;
      const node = findNodeById(categories, nodeId);
      setSelectedNode(node);
      setSelectedKeys([nodeId]);
    } else {
      setSelectedNode(null);
      setSelectedKeys([]);
    }
  };

  const handleAdd = (parentId?: string) => {
    setModalMode('add');
    form.resetFields();
    if (parentId) {
      form.setFieldsValue({ parent_id: parentId });
    }
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (!selectedNode) return;
    setModalMode('edit');
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedNode) return;
    try {
      await mockSkillAPI.deleteCategory(selectedNode.id);
      message.success('Đã xóa danh mục thành công');
      setSelectedNode(null);
      setSelectedKeys([]);
      loadData();
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Không thể xóa danh mục');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (modalMode === 'add') {
        const parentLevel = values.parent_id
          ? findNodeById(categories, values.parent_id)?.level || 0
          : 0;
        await mockSkillAPI.createCategory({
          ...values,
          level: parentLevel + 1,
        });
        message.success('Đã thêm danh mục mới thành công');
      } else {
        await mockSkillAPI.updateCategory(selectedNode!.id, values);
        message.success('Đã cập nhật danh mục thành công');
      }
      setModalVisible(false);
      form.resetFields();
      loadData();
    } catch (error) {
      console.error('Error saving category:', error);
      message.error('Không thể lưu danh mục');
    }
  };

  const handleAddDetail = () => {
    if (!selectedNode) return;
    setEditingDetail(null);
    detailForm.resetFields();
    setDetailModalVisible(true);
  };

  const handleEditDetail = (detail: SkillDetail) => {
    setEditingDetail(detail);
    setDetailModalVisible(true);
  };

  const handleDetailModalOk = async () => {
    try {
      const values = await detailForm.validateFields();
      const requirements = JSON.parse(values.requirements);
      if (editingDetail) {
        await mockSkillAPI.updateDetail(editingDetail.id, {
          skill_level: values.skill_level,
          requirements,
        });
        message.success('Đã cập nhật chi tiết thành công');
      } else {
        await mockSkillAPI.createDetail({
          category_id: selectedNode!.id,
          skill_level: values.skill_level,
          requirements,
        });
        message.success('Đã thêm chi tiết mới thành công');
      }
      setDetailModalVisible(false);
      detailForm.resetFields();
      loadData();
    } catch (error) {
      console.error('Error saving detail:', error);
      message.error('Không thể lưu chi tiết');
    }
  };

  const handleDeleteDetail = async (detailId: string) => {
    try {
      await mockSkillAPI.deleteDetail(detailId);
      message.success('Đã xóa chi tiết thành công');
      loadData();
    } catch (error) {
      console.error('Error deleting detail:', error);
      message.error('Không thể xóa chi tiết');
    }
  };

  return (
    <div className="fade-in">
      {/* Header với button xuất Excel */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
            Quản lý cây phân cấp kỹ năng
          </h2>
        </Col>
        <Col>
          <ExcelExportButton categories={categories} />
        </Col>
      </Row>
      
      <Row gutter={24}>
        <Col span={10}>
          <Card
            className="modern-card"
            title="Cây phân cấp"
            extra={
              <ActionButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd()}
                label="Thêm gốc"
              />
            }
            bodyStyle={{ padding: '20px' }}
          >
            <CategoryTree
              categories={categories}
              selectedKeys={selectedKeys}
              loading={loading}
              onSelect={onSelect}
            />
          </Card>
        </Col>

        <Col span={14}>
          <Card
            className="modern-card"
            title={selectedNode ? `Chi tiết: ${selectedNode.name}` : 'Chọn một mục'}
            bodyStyle={{ padding: '24px' }}
          >
            <CategoryDetails
              selectedNode={selectedNode}
              onAddChild={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddDetail={handleAddDetail}
              onEditDetail={handleEditDetail}
              onDeleteDetail={handleDeleteDetail}
            />
          </Card>
        </Col>
      </Row>

      {/* Category Modal */}
      <Modal
        title={modalMode === 'add' ? 'Thêm danh mục mới' : 'Sửa danh mục'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >
        <CategoryForm
          form={form}
          initialData={selectedNode}
          categories={categories}
          mode={modalMode}
        />
      </Modal>

      {/* Detail Modal */}
      <Modal
        title={editingDetail ? 'Sửa chi tiết' : 'Thêm chi tiết mới'}
        open={detailModalVisible}
        onOk={handleDetailModalOk}
        onCancel={() => {
          setDetailModalVisible(false);
          detailForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
      >
        <DetailForm
          form={detailForm}
          initialData={editingDetail}
          skillLevels={skillLevels}
        />
      </Modal>
    </div>
  );
};

export default HierarchicalCRUD;
