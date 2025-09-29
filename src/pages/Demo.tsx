import React from 'react';
import { Card, Row, Col, Typography, Space, Button, Divider } from 'antd';
import { 
  TableOutlined, 
  NodeIndexOutlined,
  DownloadOutlined,
  EyeOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const Demo: React.FC = () => {
  const demoSections = [
    {
      title: 'Career Path Tracking',
      description: 'Module theo dõi lộ trình phát triển nghề nghiệp với sơ đồ cây phân cấp',
      icon: <NodeIndexOutlined style={{ fontSize: 24 }} />,
      path: '/career-path-tracking',
      features: [
        'Sơ đồ lộ trình nghề nghiệp OSS Software System',
        'Làm nổi bật vị trí người dùng hiện tại',
        'Chi tiết vị trí công việc',
        'Tính năng chuyển vị trí công việc',
        'User switcher để test các trường hợp'
      ],
      color: '#1890ff'
    },
    {
      title: 'Test CRUD Operations',
      description: 'Demo CRUD operations với API integration',
      icon: <CodeOutlined style={{ fontSize: 24 }} />,
      path: '/test-crud',
      features: [
        'CRUD operations với testApi',
        'Form validation và error handling',
        'Modal forms cho create/update',
        'Confirmation dialogs cho delete',
        'Success/Error messages',
        'Loading states'
      ],
      color: '#722ed1'
    },
    {
      title: 'Test Pagination',
      description: 'Demo pagination với productApi và TestItem data',
      icon: <DownloadOutlined style={{ fontSize: 24 }} />,
      path: '/test-pagination',
      features: [
        'Pagination với productApi',
        'CRUD operations cho products',
        'Form validation',
        'Table với pagination controls',
        'Modal forms',
        'Type safety với TestItem'
      ],
      color: '#eb2f96'
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        {/* Header */}
        <Col span={24}>
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Title level={1} style={{ marginBottom: 16 }}>
                🚀 Demo Center
              </Title>
              <Paragraph style={{ fontSize: 18, color: '#666', maxWidth: 800, margin: '0 auto' }}>
                Tổng hợp các demo và tính năng đã phát triển. 
                Bao gồm Career Path Tracking, CRUD operations và các utility functions.
              </Paragraph>
            </div>
          </Card>
        </Col>

        {/* Demo Sections */}
        {demoSections.map((section, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                border: `2px solid ${section.color}20`,
                borderRadius: 16
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    color: section.color, 
                    marginBottom: 12,
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    {section.icon}
                  </div>
                  <Title level={3} style={{ margin: 0, color: section.color }}>
                    {section.title}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    {section.description}
                  </Text>
                </div>

                <Divider style={{ margin: '16px 0' }} />

                {/* Features */}
                <div>
                  <Title level={5} style={{ marginBottom: 12 }}>
                    ✨ Tính năng:
                  </Title>
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    {section.features.map((feature, idx) => (
                      <li key={idx} style={{ marginBottom: 8, fontSize: 14 }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<EyeOutlined />}
                      style={{ backgroundColor: section.color, borderColor: section.color }}
                    >
                      <Link to={section.path} style={{ color: 'white' }}>
                        Xem Demo
                      </Link>
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
        ))}

        {/* Technical Info */}
        <Col span={24}>
          <Card title="🔧 Thông tin kỹ thuật">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Title level={4}>📁 Cấu trúc Files:</Title>
                <div style={{ backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8 }}>
                  <pre style={{ margin: 0, fontSize: 12 }}>
{`src/
├── pages/
│   ├── CareerPathTracking.tsx
│   ├── TestCRUD.tsx
│   ├── TestPagination.tsx
│   └── Demo.tsx
├── components/
│   └── Career/
│       ├── CareerPathGrid.tsx
│       ├── PositionDetails.tsx
│       ├── PositionTransferModal.tsx
│       └── UserSwitcher.tsx
├── utils/
│   └── tableTreeUtils.ts
├── services/api/
│   ├── careerApi.ts
│   ├── testApi.ts
│   └── productApi.ts
└── types/
    ├── career.ts
    ├── test.ts
    └── product.ts`}
                  </pre>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <Title level={4}>🛠️ Technologies:</Title>
                <ul>
                  <li><strong>React 18</strong> - UI Framework</li>
                  <li><strong>TypeScript</strong> - Type Safety</li>
                  <li><strong>Ant Design</strong> - UI Components</li>
                  <li><strong>Redux Toolkit Query</strong> - API Management</li>
                  <li><strong>React Router</strong> - Navigation</li>
                  <li><strong>Day.js</strong> - Date Handling</li>
                </ul>

                <Title level={4}>📊 Key Features:</Title>
                <ul>
                  <li>✅ Career Path visualization</li>
                  <li>✅ CRUD operations với API</li>
                  <li>✅ Table Tree operations với parent_id</li>
                  <li>✅ Type-safe development</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Mock data integration</li>
                </ul>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Quick Links */}
        <Col span={24}>
          <Card title="🔗 Quick Links">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  type="primary" 
                  icon={<NodeIndexOutlined />}
                >
                  <Link to="/career-path-tracking" style={{ color: 'white' }}>
                    Career Path
                  </Link>
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  type="default" 
                  icon={<CodeOutlined />}
                >
                  <Link to="/test-crud">
                    Test CRUD
                  </Link>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Demo;
