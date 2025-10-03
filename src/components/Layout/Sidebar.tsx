import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  RiseOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  UploadOutlined,
  ExperimentOutlined,
  TableOutlined,
  CodeOutlined,
  BranchesOutlined,
  NodeIndexOutlined,
  SwapOutlined,
  EyeOutlined,
  ProjectOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Định nghĩa menu items
  const menuItems = [
    {
      key: '/demo',
      icon: <ExperimentOutlined />,
      label: 'Demo Center',
    },
    {
      type: 'divider' as const,
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'hr-management',
      icon: <TeamOutlined />,
      label: 'Quản lý nhân sự',
      children: [
        {
          key: '/employees',
          icon: <UserOutlined />,
          label: 'Quản lý nhân viên',
        },
        {
          key: '/departments',
          icon: <ApartmentOutlined />,
          label: 'Phòng ban',
        },
      ],
    },
    {
      key: 'career-development',
      icon: <RiseOutlined />,
      label: 'Phát triển nghề nghiệp',
      children: [
        {
          key: '/career-paths',
          icon: <BranchesOutlined />,
          label: 'Lộ trình sự nghiệp',
        },
        {
          key: '/personal-tracking',
          icon: <ProjectOutlined />,
          label: 'Lộ trình cá nhân',
        },
        {
          key: '/career-roadmap',
          icon: <FileTextOutlined />,
          label: 'Lộ trình nghề nghiệp',
        },
        {
          key: '/job-comparison',
          icon: <SwapOutlined />,
          label: 'So sánh công việc',
        },
      ],
    },
    {
      key: 'matrix-management',
      icon: <FundProjectionScreenOutlined />,
      label: 'Ma trận quản lý',
      children: [
        {
          key: '/development-matrix',
          icon: <NodeIndexOutlined />,
          label: 'Ma trận phát triển cá nhân',
        },
        {
          key: '/career-matrix',
          icon: <TableOutlined />,
          label: 'Ma trận quản lý nghề nghiệp',
        },
      ],
    },
    {
      key: '/hierarchical-crud',
      icon: <BranchesOutlined />,
      label: 'Quản lý cây phân cấp',
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: 'Upload file',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'demo-features',
      icon: <ExperimentOutlined />,
      label: 'Demo Features',
      children: [
        {
          key: '/career-path-tracking',
          icon: <EyeOutlined />,
          label: 'Career Path Tracking',
        },
        {
          key: '/test-crud',
          icon: <CodeOutlined />,
          label: 'Test CRUD',
        },
        {
          key: '/test-pagination',
          icon: <TableOutlined />,
          label: 'Test Pagination',
        },
        {
          key: '/unit-tree-crud',
          icon: <BranchesOutlined />,
          label: 'Unit Tree CRUD',
        },
      ],
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className="modern-sidebar"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div 
        style={{ 
          height: 32, 
          margin: 16, 
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {collapsed ? 'VTNET' : 'VTNET CAREER'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          background: 'transparent',
          border: 'none',
        }}
      />
    </Sider>
  );
};

export default Sidebar;