import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Alert, 
  Drawer,
  Typography,
  Space,
  Tag,
  InputNumber
} from 'antd';
import { 
  useGetCareerPathQuery,
  useGetUserProfileQuery,
  useGetPositionDetailsQuery,
  useRequestPositionTransferMutation,
  useCreateUserProfileMutation
} from '@/services/api/careerApi';
import { CareerPosition, CAREER_LEVELS } from '@/types/career';
import CareerPathGrid from '../components/Career/CareerPathGrid';
import PositionDetails from '../components/Career/PositionDetails';
import PositionTransferModal from '../components/Career/PositionTransferModal';
import UserSwitcher from '../components/Career/UserSwitcher';

const { Title, Text } = Typography;

const CareerPathTracking: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<CareerPosition | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [userId, setUserId] = useState('user-123');
  
  // API calls
  const { data: careerPath, isLoading: pathLoading } = useGetCareerPathQuery('OSS Software System');
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useGetUserProfileQuery(userId);
  const { data: positionDetails } = useGetPositionDetailsQuery(selectedPosition?.id || '');
  
  const [requestTransfer] = useRequestPositionTransferMutation();
  const [createProfile] = useCreateUserProfileMutation();
  
  const [form] = Form.useForm();

  // Check if user has profile
  const hasProfile = userProfile && !profileError;
  const currentPosition = userProfile?.currentPosition;

  const handlePositionClick = (position: CareerPosition) => {
    setSelectedPosition(position);
    setShowDetailsDrawer(true);
  };

  const handleTransferRequest = async (values: any) => {
    try {
      await requestTransfer({
        userId,
        fromPositionId: currentPosition?.id || '',
        toPositionId: selectedPosition?.id || '',
        reason: values.reason,
        requestedDate: new Date().toISOString(),
      }).unwrap();
      
      message.success('Yêu cầu chuyển vị trí đã được gửi thành công!');
      setShowTransferModal(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi yêu cầu chuyển vị trí');
    }
  };

  const handleCreateProfile = async (values: any) => {
    try {
      await createProfile({
        userId,
        experience: values.experience,
        education: values.education,
        skills: values.skills || [],
        careerHistory: [],
      }).unwrap();
      
      message.success('Hồ sơ nghề nghiệp đã được tạo thành công!');
      setShowProfileModal(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo hồ sơ');
    }
  };

  const getPositionColor = (position: CareerPosition) => {
    if (currentPosition?.id === position.id) {
      return '#52c41a'; // Green for current position
    }
    if (selectedPosition?.id === position.id) {
      return '#1890ff'; // Blue for selected position
    }
    return '#f0f0f0'; // Default gray
  };

  if (pathLoading || profileLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {/* User Switcher for Demo */}
        <Col span={24}>
          <UserSwitcher currentUserId={userId} onUserChange={setUserId} />
        </Col>

        {/* Header */}
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2}>Lộ trình phát triển nghề nghiệp</Title>
                <Text type="secondary">Lĩnh vực: Hệ thống phần mềm OSS</Text>
              </Col>
              <Col>
                <Space>
                  {!hasProfile && (
                    <Button type="primary" onClick={() => setShowProfileModal(true)}>
                      Tạo hồ sơ nghề nghiệp
                    </Button>
                  )}
                  <Button onClick={() => setShowTransferModal(true)}>
                    Chuyển vị trí công việc
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Profile Status Alert */}
        {!hasProfile && (
          <Col span={24}>
            <Alert
              message="Chưa có hồ sơ nghề nghiệp"
              description="Bạn cần tạo hồ sơ nghề nghiệp để có thể theo dõi lộ trình phát triển và chuyển vị trí công việc."
              type="warning"
              showIcon
              action={
                <Button size="small" type="primary" onClick={() => setShowProfileModal(true)}>
                  Tạo hồ sơ ngay
                </Button>
              }
            />
          </Col>
        )}

        {/* Current Position Info */}
        {hasProfile && currentPosition && (
          <Col span={24}>
            <Card title="Vị trí hiện tại">
              <Row gutter={16}>
                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Text strong>Chức danh:</Text> {currentPosition.name}
                    </div>
                    <div>
                      <Text strong>Cấp bậc:</Text> {CAREER_LEVELS[currentPosition.level as keyof typeof CAREER_LEVELS]}
                    </div>
                    <div>
                      <Text strong>Lĩnh vực:</Text> {currentPosition.role.name}
                    </div>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Text strong>Kinh nghiệm:</Text> {userProfile?.experience} năm
                    </div>
                    <div>
                      <Text strong>Kỹ năng:</Text>
                      <div>
                        {userProfile?.skills?.map(skill => (
                          <Tag key={skill} color="blue">{skill}</Tag>
                        ))}
                      </div>
                    </div>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        )}

        {/* Career Path Grid */}
        <Col span={24}>
          <Card title="Sơ đồ lộ trình nghề nghiệp">
            {careerPath && (
              <CareerPathGrid
                careerPath={careerPath}
                currentPosition={currentPosition}
                selectedPosition={selectedPosition}
                onPositionClick={handlePositionClick}
                getPositionColor={getPositionColor}
              />
            )}
          </Card>
        </Col>

        {/* Position Details Drawer */}
        <Drawer
          title="Chi tiết vị trí công việc"
          placement="right"
          width={600}
          open={showDetailsDrawer}
          onClose={() => setShowDetailsDrawer(false)}
        >
          {selectedPosition && positionDetails && (
            <PositionDetails 
              position={positionDetails}
              currentPosition={currentPosition}
              onTransferClick={() => setShowTransferModal(true)}
            />
          )}
        </Drawer>

        {/* Position Transfer Modal */}
        <PositionTransferModal
          open={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          currentPosition={currentPosition}
          targetPosition={selectedPosition}
          onSubmit={handleTransferRequest}
        />

        {/* Create Profile Modal */}
        <Modal
          title="Tạo hồ sơ nghề nghiệp"
          open={showProfileModal}
          onCancel={() => setShowProfileModal(false)}
          footer={null}
          width={600}
        >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateProfile}
          >
            <Form.Item
              name="experience"
              label="Số năm kinh nghiệm"
              rules={[{ required: true, message: 'Vui lòng nhập số năm kinh nghiệm' }]}
            >
              <InputNumber min={0} max={50} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="education"
              label="Trình độ học vấn"
              rules={[{ required: true, message: 'Vui lòng nhập trình độ học vấn' }]}
            >
              <Input placeholder="Ví dụ: Đại học Công nghệ thông tin" />
            </Form.Item>
            
            <Form.Item
              name="skills"
              label="Kỹ năng chuyên môn"
            >
              <Select
                mode="tags"
                placeholder="Nhập các kỹ năng của bạn"
                style={{ width: '100%' }}
              />
            </Form.Item>
            
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Tạo hồ sơ
                </Button>
                <Button onClick={() => setShowProfileModal(false)}>
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default CareerPathTracking;
