import { useGetTestQuery, useCreateTestMutation, useUpdateTestMutation, useDeleteTestMutation } from '@/services/api/testApi'
import { Test, TestRequest } from '@/types/test';
import { Form, Input, Modal, Table, Button, Space, Popconfirm, message } from 'antd';
import  { useState } from 'react'

const TestCRUD = () => {
    const { data: testData, isLoading, error } = useGetTestQuery();
    console.log(testData);
    
    const [createTest] = useCreateTestMutation();
    const [updateTest] = useUpdateTestMutation();
    const [deleteTest] = useDeleteTestMutation();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<TestRequest>();
    const [editingItem, setEditingItem] = useState<Test | null>(null);
    
    // mở form thêm/sửa
    const openModal = (record?: Test) => {
      if (record) {
        setEditingItem(record);
        form.setFieldsValue({
          name: record.name,
          description: record.description
        });
      } else {
        setEditingItem(null);
        form.resetFields();
      }
      setIsModalOpen(true);
    };
  
    const handleOk = async () => {
      try {
        const values = await form.validateFields();
        
        if (editingItem) {
          // Update
          await updateTest({ id: editingItem.id, ...values }).unwrap();
          message.success("Cập nhật thành công");
        } else {
          // Create
          await createTest(values).unwrap();
          message.success("Thêm mới thành công");
        }
        
        setIsModalOpen(false);
        form.resetFields();
      } catch (error) {
        message.error("Có lỗi xảy ra");
        console.error(error);
      }
    };
  
    const handleDelete = async (id: number) => {
      try {
        await deleteTest(id).unwrap();
        message.success("Đã xoá thành công");
      } catch (error) {
        message.error("Có lỗi xảy ra khi xoá");
        console.error(error);
      }
    };
  
    const columns = [
      { title: "ID", dataIndex: "id", width: 80 },
      { title: "Tên danh mục", dataIndex: "name" },
      { title: "Mô tả", dataIndex: "description" },
      { 
        title: "Số sản phẩm", 
        dataIndex: "items", 
        width: 120,
        render: (items: any[]) => items?.length || 0 
      },
      {
        title: "Hành động",
        width: 200,
        render: (_: any, record: Test) => (
          <Space>
            <Button type="link" onClick={() => openModal(record)}>
              Sửa danh mục
            </Button>
            <Popconfirm
              title="Bạn có chắc muốn xoá danh mục này?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="link" danger>
                Xoá danh mục
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    ];
  
    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <div>Có lỗi xảy ra khi tải dữ liệu</div>;
  
    return (
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" danger onClick={() => openModal()}>
            + Thêm danh mục mới
          </Button>
        </div>
        
        <Table
          rowKey="id"
          dataSource={testData || []}
          columns={columns}
          pagination={false}
        />
  
        <Modal
          title={editingItem ? "Sửa danh mục" : "Thêm danh mục mới"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Tên danh mục" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
}

export default TestCRUD

