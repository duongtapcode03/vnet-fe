import React, { useEffect } from 'react';
import { Drawer, Form, Input, Select, Button, message, Space } from 'antd';
import { Category } from '@/types';
import { useCreateCategoryMutation, useUpdateCategoryMutation, useGetCategoriesMutation } from '@/services/api/categoryApi';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  category?: Category | null;
  parentId?: number | null;
  mode: 'create' | 'edit';
  onSuccess: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onClose,
  category,
  parentId,
  mode,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [getCategories] = useGetCategoriesMutation();

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && category) {
        form.setFieldsValue({
          categoryCode: category.categoryCode,
          categoryName: category.categoryName,
          description: category.description,
          editable: category.editable,
          isDeleted: category.isDeleted,
        });
      } else {
        form.resetFields();
        if (parentId) {
          form.setFieldsValue({ parentId });
        }
      }
    }
  }, [visible, mode, category, parentId, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (mode === 'create') {
        await createCategory({
          categoryCode: values.categoryCode,
          categoryName: values.categoryName,
          description: values.description,
          editable: values.editable || "1",
          parentId: parentId || undefined,
        }).unwrap();
        message.success('Tạo danh mục thành công');
      } else if (mode === 'edit' && category) {
        await updateCategory({
          id: category.id,
          data: {
            categoryCode: values.categoryCode,
            categoryName: values.categoryName,
            description: values.description,
            editable: values.editable,
            parentId: values.parentId,
          }
        }).unwrap();
        message.success('Cập nhật danh mục thành công');
      }

      // Refetch data để cập nhật UI
      try {
        await getCategories({ 
          page: 0, 
          size: 100,
          sortBy: "id",
          sortDescription: "asc"
        }).unwrap();
      } catch (refetchError) {
        console.error('Lỗi khi refetch data:', refetchError);
        message.warning('Danh mục đã được lưu nhưng không thể cập nhật danh sách. Vui lòng refresh trang.');
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(`Lỗi khi ${mode === 'create' ? 'tạo' : 'cập nhật'} danh mục:`, error);
      
      // Xử lý các loại lỗi khác nhau
      if (error?.status === 400) {
        // Lỗi validation từ server
        if (error?.data?.message) {
          message.error(`Lỗi dữ liệu: ${error.data.message}`);
        } else if (error?.data?.errors) {
          // Hiển thị các lỗi validation cụ thể
          const validationErrors = error.data.errors;
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach((err: any) => {
              message.error(`${err.field}: ${err.message}`);
            });
          } else {
            message.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại');
          }
        } else {
          message.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại');
        }
      } else if (error?.status === 409) {
        message.error('Mã danh mục đã tồn tại. Vui lòng chọn mã khác');
      } else if (error?.status === 403) {
        message.error('Bạn không có quyền thực hiện thao tác này');
      } else if (error?.status === 404) {
        message.error('Danh mục không tồn tại hoặc đã bị xóa');
      } else if (error?.status >= 500) {
        message.error('Lỗi server. Vui lòng thử lại sau');
      } else if (error?.message) {
        message.error(`Lỗi: ${error.message}`);
      } else {
        message.error(`Có lỗi xảy ra khi ${mode === 'create' ? 'tạo' : 'cập nhật'} danh mục. Vui lòng thử lại`);
      }
    }
  };

  const title = mode === 'create' ? 'Thêm danh mục mới' : 'Sửa danh mục';

  return (
    <Drawer
      title={title}
      open={visible}
      onClose={onClose}
      width={600}
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={onClose}>
            Hủy
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            {mode === 'create' ? 'Tạo' : 'Cập nhật'}
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          editable: "1",
          isDeleted: "0"
        }}
      >
        <Form.Item
          name="categoryCode"
          label="Mã danh mục"
          rules={[
            { required: true, message: 'Vui lòng nhập mã danh mục' },
            { max: 100, message: 'Mã danh mục không được quá 100 ký tự' }
          ]}
        >
          <Input placeholder="Nhập mã danh mục" />
        </Form.Item>

        <Form.Item
          name="categoryName"
          label="Tên danh mục"
          rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục' },
            { max: 255, message: 'Tên danh mục không được quá 255 ký tự' }
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <Input.TextArea 
            placeholder="Nhập mô tả danh mục" 
            rows={3}
          />
        </Form.Item>

        <Form.Item
          name="editable"
          label="Có thể sửa"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái có thể sửa' }]}
        >
          <Select>
            <Select.Option value="1">Có thể sửa</Select.Option>
            <Select.Option value="0">Không thể sửa</Select.Option>
          </Select>
        </Form.Item>

        {mode === 'edit' && (
          <Form.Item
            name="isDeleted"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Select.Option value="0">Hoạt động</Select.Option>
              <Select.Option value="1">Đã xóa</Select.Option>
            </Select>
          </Form.Item>
        )}

        {mode === 'create' && parentId && (
          <Form.Item
            name="parentId"
            label="Danh mục cha"
            initialValue={parentId}
          >
            <Input disabled value={parentId} />
          </Form.Item>
        )}
      </Form>
    </Drawer>
  );
};

export default CategoryModal;
