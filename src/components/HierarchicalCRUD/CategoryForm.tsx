import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { CategoryFormData, CategoryNode } from './types';

const { Option } = Select;
const { TextArea } = Input;

interface CategoryFormProps {
  form: any;
  initialData?: CategoryNode | null;
  categories: CategoryNode[];
  mode: 'add' | 'edit';
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  form,
  initialData,
  categories,
  mode,
}) => {
  const flattenCategories = (nodes: CategoryNode[]): CategoryNode[] => {
    let result: CategoryNode[] = [];
    nodes.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenCategories(node.children));
      }
    });
    return result;
  };

  useEffect(() => {
    if (initialData && mode === 'edit') {
      form.setFieldsValue({
        name: initialData.name,
        code: initialData.code,
        description: initialData.description,
        order_index: initialData.order_index,
        parent_id: initialData.parent_id,
      });
    }
  }, [initialData, mode, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Tên danh mục"
        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
      >
        <Input placeholder="Nhập tên danh mục" />
      </Form.Item>

      <Form.Item name="code" label="Mã danh mục">
        <Input placeholder="Nhập mã danh mục" />
      </Form.Item>

      <Form.Item name="order_index" label="Thứ tự">
        <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
      </Form.Item>

      <Form.Item name="parent_id" label="Danh mục cha">
        <Select placeholder="Chọn danh mục cha" allowClear>
          {flattenCategories(categories).map(cat => (
            <Option key={cat.id} value={cat.id}>
              {'  '.repeat(cat.level - 1)}
              {cat.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <TextArea rows={3} placeholder="Nhập mô tả" />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
