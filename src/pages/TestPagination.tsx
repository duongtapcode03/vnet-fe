import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '@/services/api/productApi'
import { TestItem } from '@/types/test';
import { Form, Input, Modal, Table, Button, Space, Popconfirm, message, InputNumber } from 'antd';
import { useState } from 'react'

const TestPagination = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { data: products, isLoading, error } = useGetProductsQuery({page, pageSize});
    console.log(products);
    
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<TestItem>();
    const [editingItem, setEditingItem] = useState<TestItem | null>(null);
    
    // mở form thêm/sửa
    const openModal = (record?: TestItem) => {
      if (record) {
        setEditingItem(record);
        form.setFieldsValue({
          name: record.name,
          category: record.category,
          price: record.price,
          cateId: record.cateId
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
          await updateProduct({ id: editingItem.id, ...values }).unwrap();
          message.success("Cập nhật sản phẩm thành công");
        } else {
          // Create
          await createProduct(values).unwrap();
          message.success("Thêm sản phẩm thành công");
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
        await deleteProduct({id: id.toString()}).unwrap();
        message.success("Đã xoá sản phẩm thành công");
      } catch (error) {
        message.error("Có lỗi xảy ra khi xoá sản phẩm");
        console.error(error);
      }
    };
  
    const columns = [
      { title: "ID", dataIndex: "id", width: 80 },
      { title: "Tên sản phẩm", dataIndex: "name" },
      { title: "Danh mục", dataIndex: "category" },
      { title: "Giá", dataIndex: "price", 
        render: (price: number) => price.toLocaleString() + " đ"
      },
      { title: "Danh mục ID", dataIndex: "cateId", width: 100 },
      { title: "Tên danh mục", dataIndex: "cateName" },
      {
        title: "Hành động",
        width: 200,
        render: (_: any, record: TestItem) => (
          <Space>
            <Button type="link" onClick={() => openModal(record)}>
              Sửa sản phẩm
            </Button>
            <Popconfirm
              title="Bạn có chắc muốn xoá sản phẩm này?"
              onConfirm={() => handleDelete(record.id)}
              okType='danger'
            >
              <Button type="link" danger>
                Xoá sản phẩm
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
            + Thêm sản phẩm mới
          </Button>
        </div>
        
        <Table
          rowKey="id"
          dataSource={products?.content || []}
          columns={columns}
          pagination={{
            current: page + 1,
            pageSize: pageSize,
            total: products?.totalElements || 0, // Bạn có thể lấy từ API response
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} sản phẩm`,
            onChange: (newPage, newPageSize) => {
              setPage(newPage - 1);
              if (newPageSize) {
                setPageSize(newPageSize);
              }
            },
          }}
        />
  
        <Modal
          title={editingItem ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          open={isModalOpen}
          onOk={handleOk}
          okType='danger'
          okText={editingItem ? "Cập nhật" : "Thêm"}
          onCancel={() => setIsModalOpen(false)}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Vui lòng nhập danh mục' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
            <Form.Item name="cateId" label="ID Danh mục" rules={[{ required: true, message: 'Vui lòng nhập ID danh mục' }]}>
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
}

export default TestPagination
