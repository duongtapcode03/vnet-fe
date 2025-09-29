import React from 'react';
import { Card, Select, Typography, Space, Tag } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

interface UserSwitcherProps {
  currentUserId: string;
  onUserChange: (userId: string) => void;
}

const UserSwitcher: React.FC<UserSwitcherProps> = ({ currentUserId, onUserChange }) => {
  const userOptions = [
    {
      id: 'user-123',
      name: 'Nguyễn Văn A',
      position: 'F DEV2',
      hasProfile: true,
      description: 'FullStack Developer với 3 năm kinh nghiệm'
    },
    {
      id: 'user-456', 
      name: 'Trần Thị B',
      position: 'PM1',
      hasProfile: true,
      description: 'Project Manager với 4 năm kinh nghiệm'
    },
    {
      id: 'user-789',
      name: 'Lê Văn C',
      position: 'Chưa có',
      hasProfile: false,
      description: 'Người dùng mới, chưa có hồ sơ nghề nghiệp'
    }
  ];

  const currentUser = userOptions.find(user => user.id === currentUserId);

  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Title level={5} style={{ margin: 0 }}>Demo User Switcher</Title>
          <Text type="secondary">Chọn user để test các trường hợp khác nhau</Text>
        </div>
        
        <Select
          value={currentUserId}
          onChange={onUserChange}
          style={{ width: '100%' }}
          placeholder="Chọn user để test"
        >
          {userOptions.map(user => (
            <Option key={user.id} value={user.id}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {user.position} - {user.description}
                </div>
              </div>
            </Option>
          ))}
        </Select>

        {currentUser && (
          <div>
            <Text strong>User hiện tại: </Text>
            <Tag color={currentUser.hasProfile ? 'green' : 'red'}>
              {currentUser.name} ({currentUser.position})
            </Tag>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default UserSwitcher;

