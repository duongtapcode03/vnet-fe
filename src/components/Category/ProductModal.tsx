import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { Category } from '@/types';
import { SimpleTestProductResponse, SimpleTestProductCreateRequest } from '@/services/api/testProductApi';

interface ProductModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (values: SimpleTestProductCreateRequest) => Promise<void>;
  product?: SimpleTestProductResponse | null;
  categories: Map<number, Category>;
  loading?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onCancel,
  onOk,
  product,
  categories,
  loading = false
}) => {
  const [form] = Form.useForm();
  const isEdit = !!product;

  useEffect(() => {
    if (open) {
      if (isEdit && product) {
        // Populate form with existing product data
        form.setFieldsValue({
          productCode: product.productCode,
          productName: product.productName,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          categoryId: product.categoryId,
        });
      } else {
        // Reset form for create mode
        form.resetFields();
      }
    }
  }, [open, isEdit, product, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onOk(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // Convert categories Map to Select options
  const categoryOptions = Array.from(categories.values()).map(category => ({
    label: category.categoryName,
    value: category.id,
  }));

  return (
    <Modal
      title={isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="productCode"
          label="Mã sản phẩm"
          rules={[
            { required: true, message: 'Vui lòng nhập mã sản phẩm!' },
            { max: 50, message: 'Mã sản phẩm không được quá 50 ký tự!' }
          ]}
        >
          <Input placeholder="Nhập mã sản phẩm" />
        </Form.Item>

        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[
            { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
            { max: 200, message: 'Tên sản phẩm không được quá 200 ký tự!' }
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            { max: 500, message: 'Mô tả không được quá 500 ký tự!' }
          ]}
        >
          <Input.TextArea 
            placeholder="Nhập mô tả sản phẩm" 
            rows={3}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="price"
            label="Giá (VND)"
            rules={[
              { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
              { type: 'number', min: 0, message: 'Giá phải lớn hơn hoặc bằng 0!' }
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber
              placeholder="Nhập giá"
              style={{ width: '100%' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              min={0}
              step={1000}
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng!' },
              { type: 'number', min: 0, message: 'Số lượng phải lớn hơn hoặc bằng 0!' }
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber
              placeholder="Nhập số lượng"
              style={{ width: '100%' }}
              min={0}
              step={1}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="categoryId"
          label="Danh mục"
          rules={[
            { required: true, message: 'Vui lòng chọn danh mục!' }
          ]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={categoryOptions}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
