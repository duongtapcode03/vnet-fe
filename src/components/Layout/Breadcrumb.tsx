import React from 'react';
import { Breadcrumb as AntBreadcrumb, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Định nghĩa mapping từ route đến breadcrumb
const routeMapping: Record<string, { title: string; parent?: string }> = {
  '/': { title: 'Trang chủ' },
  '/demo': { title: 'Demo Center' },
  '/dashboard': { title: 'Dashboard' },
  
  // HR Management
  '/employees': { title: 'Quản lý nhân viên', parent: 'hr-management' },
  '/departments': { title: 'Phòng ban', parent: 'hr-management' },
  
  // Career Development
  '/career-paths': { title: 'Lộ trình sự nghiệp', parent: 'career-development' },
  '/personal-tracking': { title: 'Lộ trình cá nhân', parent: 'career-development' },
  '/career-roadmap': { title: 'Lộ trình nghề nghiệp', parent: 'career-development' },
  '/job-comparison': { title: 'So sánh công việc', parent: 'career-development' },
  
  // Matrix Management
  '/development-matrix': { title: 'Ma trận phát triển cá nhân', parent: 'matrix-management' },
  '/career-matrix': { title: 'Ma trận quản lý nghề nghiệp', parent: 'matrix-management' },
  
  // Hierarchical CRUD
  '/hierarchical-crud': { title: 'Quản lý cây phân cấp' },
  
  // Utility
  '/upload': { title: 'Upload file' },
  '/settings': { title: 'Cài đặt' },
  
  // Demo Features
  '/career-path-tracking': { title: 'Career Path Tracking', parent: 'demo-features' },
  '/test-crud': { title: 'Test CRUD', parent: 'demo-features' },
  '/test-pagination': { title: 'Test Pagination', parent: 'demo-features' },
  '/unit-tree-crud': { title: 'Unit Tree CRUD', parent: 'demo-features' },
};

// Định nghĩa parent groups
const parentGroups: Record<string, { title: string; path?: string }> = {
  'hr-management': { title: 'Quản lý nhân sự' },
  'career-development': { title: 'Phát triển nghề nghiệp' },
  'matrix-management': { title: 'Ma trận quản lý' },
  'demo-features': { title: 'Demo Features' },
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Tạo breadcrumb items từ current path
  const generateBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items = [];
    
    // Home item
    items.push({
      key: 'home',
      title: (
        <span 
          onClick={() => navigate('/demo')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <HomeOutlined style={{ marginRight: 4 }} />
          Trang chủ
        </span>
      ),
    });
    
    // Current route
    const currentRoute = location.pathname;
    const routeInfo = routeMapping[currentRoute];
    
    if (routeInfo) {
      // Nếu có parent group, thêm parent trước
      if (routeInfo.parent && parentGroups[routeInfo.parent]) {
        items.push({
          key: routeInfo.parent,
          title: parentGroups[routeInfo.parent].title,
        });
      }
      
      // Thêm current page (không clickable)
      items.push({
        key: currentRoute,
        title: (
          <Text strong style={{ color: '#374151' }}>
            {routeInfo.title}
          </Text>
        ),
      });
    } else {
      // Xử lý dynamic routes (có params)
      if (pathSegments.length > 0) {
        let currentPath = '';
        
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          
          // Kiểm tra nếu là route với params
          if (routeMapping[currentPath]) {
            const info = routeMapping[currentPath];
            
            // Thêm parent nếu có
            if (info.parent && parentGroups[info.parent] && !items.some(item => item.key === info.parent)) {
              items.push({
                key: info.parent,
                title: parentGroups[info.parent].title,
              });
            }
            
            items.push({
              key: currentPath,
              title: (
                <span 
                  onClick={() => navigate(currentPath)} 
                  style={{ cursor: index < pathSegments.length - 1 ? 'pointer' : 'default' }}
                >
                  {info.title}
                </span>
              ),
            });
          } else if (index === pathSegments.length - 1) {
            // Last segment, có thể là ID hoặc detail page
            const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
            const parentInfo = routeMapping[parentPath];
            
            if (parentInfo) {
              // Thêm parent nếu chưa có
              if (!items.some(item => item.key === parentPath)) {
                if (parentInfo.parent && parentGroups[parentInfo.parent] && !items.some(item => item.key === parentInfo.parent)) {
                  items.push({
                    key: parentInfo.parent,
                    title: parentGroups[parentInfo.parent].title,
                  });
                }
                
                items.push({
                  key: parentPath,
                  title: (
                    <span 
                      onClick={() => navigate(parentPath)} 
                      style={{ cursor: 'pointer' }}
                    >
                      {parentInfo.title}
                    </span>
                  ),
                });
              }
              
              // Thêm detail page (không clickable)
              items.push({
                key: currentPath,
                title: (
                  <Text strong style={{ color: '#374151' }}>
                    Chi tiết ({segment})
                  </Text>
                ),
              });
            }
          }
        });
      }
    }
    
    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <AntBreadcrumb
      items={breadcrumbItems}
      style={{
        margin: '0 24px',
        fontSize: '14px',
      }}
    />
  );
};

export default Breadcrumb;
