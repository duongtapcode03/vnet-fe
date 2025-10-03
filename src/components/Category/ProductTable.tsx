import React, { useState } from 'react';
import { Table, Button, Input, Space, Popconfirm, Tag, message, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Category } from '@/types';
import { useGetCategoriesMutation } from '@/services/api/categoryApi';
import { 
  useGetProductsByCategoryQuery, 
  useGetAllProductsQuery, 
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  SimpleTestProductResponse,
  SimpleTestProductCreateRequest
} from '@/services/api/testProductApi';
import ProductModal from './ProductModal';

interface ProductTableProps {
  selectedCategoryId: number | null;
  showDeleted: boolean;
  onDataChange: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  selectedCategoryId, 
  onDataChange 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<SimpleTestProductResponse | null>(null);

  // Sử dụng RTK Query để lấy dữ liệu categories và products
  const [getCategories, { 
    data: categoriesData, 
    isLoading: categoriesLoading 
  }] = useGetCategoriesMutation();
  
  // API call để lấy tất cả sản phẩm (khi component mount hoặc selectedCategoryId = null)
  const {
    data: allProductsData,
    isLoading: allProductsLoading,
    error: allProductsError,
    refetch: refetchAllProducts
  } = useGetAllProductsQuery({
    page: 0,
    size: 100,
    sortBy: 'id',
    sortDirection: 'desc'
  });

  // API call để lấy sản phẩm theo danh mục
  const {
    data: categoryProductsData,
    isLoading: categoryProductsLoading,
    error: categoryProductsError,
    refetch: refetchCategoryProducts
  } = useGetProductsByCategoryQuery(
    { 
      categoryId: selectedCategoryId!,
      page: 0,
      size: 100,
      sortBy: 'id',
      sortDirection: 'desc'
    },
    { skip: !selectedCategoryId }
  );

  // CRUD mutations
  const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

  // Xác định data và loading state dựa trên selectedCategoryId
  const productsData = selectedCategoryId ? categoryProductsData : allProductsData;
  const productsLoading = selectedCategoryId ? categoryProductsLoading : allProductsLoading;
  const refetchProducts = selectedCategoryId ? refetchCategoryProducts : refetchAllProducts;
  
  console.log('categoriesData', categoriesData);
  console.log('productsData', productsData);

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
        console.error('Lỗi khi tải danh sách danh mục:', error);
        
        if (error?.status === 401) {
          message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        } else if (error?.status === 403) {
          message.error('Bạn không có quyền truy cập danh sách danh mục');
        } else if (error?.status >= 500) {
          message.error('Lỗi server. Vui lòng thử lại sau');
        } else if (error?.message) {
          message.error(`Lỗi tải dữ liệu: ${error.message}`);
        } else {
          message.error('Không thể tải danh sách danh mục. Vui lòng thử lại');
        }
      }
    };
    
    fetchData();
  }, [getCategories]);

  // Handle products error
  React.useEffect(() => {
    const currentError = selectedCategoryId ? categoryProductsError : allProductsError;
    
    if (currentError) {
      console.error('Lỗi khi tải danh sách sản phẩm:', currentError);
      
      const error = currentError as any;
      if (error?.status === 401) {
        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
      } else if (error?.status === 403) {
        message.error('Bạn không có quyền truy cập danh sách sản phẩm');
      } else if (error?.status >= 500) {
        message.error('Lỗi server. Vui lòng thử lại sau');
      } else if (error?.message) {
        message.error(`Lỗi tải dữ liệu: ${error.message}`);
      } else {
        message.error('Không thể tải danh sách sản phẩm. Vui lòng thử lại');
      }
    }
  }, [selectedCategoryId, categoryProductsError, allProductsError]);

  // Xử lý dữ liệu categories thành Map
  const categories = React.useMemo(() => {
    if (!categoriesData?.data?.content) return new Map<number, Category>();
    
    const categoryMap = new Map<number, Category>();
    categoriesData.data.content.forEach(cat => categoryMap.set(cat.id, cat));
    return categoryMap;
  }, [categoriesData]);

  // Xử lý dữ liệu products
  const products = React.useMemo(() => {
    if (!productsData?.data?.content) return [];
    
    let filteredProducts = productsData.data.content;
    
    // Note: Backend trả về dữ liệu trong format phân trang
    // filteredProducts là mảng các SimpleTestProductResponse
    
    return filteredProducts;
  }, [productsData]);

  // Loading state tổng hợp
  const loading = categoriesLoading || productsLoading;

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: SimpleTestProductResponse) => {
    setSelectedProduct(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (record: SimpleTestProductResponse) => {
    try {
      const result = await deleteProduct({ id: record.id }).unwrap();
      
      if (result.code === 'SUCCESS') {
        message.success('Xóa sản phẩm thành công');
        refetchProducts();
        onDataChange();
      } else {
        message.error(result.message || 'Có lỗi xảy ra khi xóa sản phẩm');
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      if (error?.status === 401) {
        message.error('Phiên đăng nhập đã hết hạn');
      } else if (error?.status === 403) {
        message.error('Bạn không có quyền xóa sản phẩm này');
      } else if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error('Có lỗi xảy ra khi xóa sản phẩm');
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalOk = async (values: SimpleTestProductCreateRequest) => {
    try {
      if (selectedProduct) {
        // Update existing product
        const result = await updateProduct({
          id: selectedProduct.id,
          product: values
        }).unwrap();
        
        if (result.code === 'SUCCESS') {
          message.success('Cập nhật sản phẩm thành công');
          setIsModalOpen(false);
          setSelectedProduct(null);
          refetchProducts();
          onDataChange();
        } else {
          message.error(result.message || 'Có lỗi xảy ra khi cập nhật sản phẩm');
        }
      } else {
        // Create new product
        const result = await createProduct(values).unwrap();
        
        if (result.code === 'SUCCESS') {
          message.success('Thêm sản phẩm thành công');
          setIsModalOpen(false);
          refetchProducts();
          onDataChange();
        } else {
          message.error(result.message || 'Có lỗi xảy ra khi thêm sản phẩm');
        }
      }
    } catch (error: any) {
      console.error('Save error:', error);
      if (error?.status === 401) {
        message.error('Phiên đăng nhập đã hết hạn');
      } else if (error?.status === 403) {
        message.error('Bạn không có quyền thực hiện thao tác này');
      } else if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error(selectedProduct ? 'Có lỗi xảy ra khi cập nhật sản phẩm' : 'Có lỗi xảy ra khi thêm sản phẩm');
      }
    }
  };

  const filteredProducts = products.filter((product: SimpleTestProductResponse) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.productCode.toLowerCase().includes(term) ||
      product.productName.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term))
    );
  });

  // Format price function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const columns: ColumnsType<SimpleTestProductResponse> = [
    {
      title: 'Mã SP',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 120,
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      align: 'right',
      render: (price: number) => (
        <span style={{ fontWeight: 500, color: '#1890ff' }}>
          {formatPrice(price)}
        </span>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
      render: (quantity: number) => (
        <Tag color={quantity > 0 ? "green" : "red"}>
          {quantity}
        </Tag>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
      render: (categoryName: string) => (
        <Tag color="blue">{categoryName}</Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (createdAt: string) => (
        <span>{createdAt}</span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_: any, record: SimpleTestProductResponse) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={deleteLoading}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={
        <div>
          Sản phẩm
          {selectedCategoryId && categories.get(selectedCategoryId) ? (
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal', marginLeft: '8px' }}>
              - {categories.get(selectedCategoryId)?.categoryName}
            </span>
          ) : (
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal', marginLeft: '8px' }}>
              - Tất cả sản phẩm
            </span>
          )}
        </div>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          disabled={false}
        >
          Thêm sản phẩm
        </Button>
      }
      style={{ height: '80vh' }}
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} sản phẩm`,
        }}
        scroll={{ y: 'calc(80vh - 280px)' }}
        locale={{
          emptyText: 'Không có sản phẩm nào',
        }}
        rowClassName={() => ''}
        size="small"
      />

      <ProductModal
        open={isModalOpen}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        product={selectedProduct}
        categories={categories}
        loading={createLoading || updateLoading}
      />
    </Card>
  );
};

export default ProductTable;
