import React from 'react';
import { Card, Row, Col, Button, Tag, Divider, Typography, Space, List } from 'antd';
import { CareerPosition, CAREER_LEVELS } from '@/types/career';

const { Title, Text, Paragraph } = Typography;

interface PositionDetailsProps {
  position: CareerPosition;
  currentPosition?: CareerPosition;
  onTransferClick: () => void;
}

const PositionDetails: React.FC<PositionDetailsProps> = ({
  position,
  currentPosition,
  onTransferClick
}) => {
  const isCurrentPosition = currentPosition?.id === position.id;

  return (
    <div>
      {/* Position Header */}
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>{position.name}</Title>
            <Text type="secondary">{position.role.name}</Text>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <div>
                <Text strong>Cấp bậc:</Text> {CAREER_LEVELS[position.level as keyof typeof CAREER_LEVELS]}
              </div>
              <div>
                <Text strong>Lĩnh vực:</Text> {position.role.category}
              </div>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <div>
                <Text strong>Trạng thái:</Text>
                {isCurrentPosition ? (
                  <Tag color="green">Vị trí hiện tại</Tag>
                ) : (
                  <Tag color="blue">Có thể chuyển đến</Tag>
                )}
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Position Description */}
      <Card title="Mô tả công việc">
        <Paragraph>
          {position.description || `Vị trí ${position.name} trong lĩnh vực ${position.role.name}. 
          Đây là một vị trí quan trọng trong hệ thống phát triển nghề nghiệp OSS.`}
        </Paragraph>
      </Card>

      {/* Requirements */}
      {position.requirements && position.requirements.length > 0 && (
        <Card title="Yêu cầu công việc">
          <List
            dataSource={position.requirements}
            renderItem={(requirement) => (
              <List.Item>
                <Text>• {requirement}</Text>
              </List.Item>
            )}
          />
        </Card>
      )}

      {/* Skills */}
      {position.skills && position.skills.length > 0 && (
        <Card title="Kỹ năng cần thiết">
          <div>
            {position.skills.map((skill, index) => (
              <Tag key={index} color="blue" style={{ marginBottom: 8 }}>
                {skill}
              </Tag>
            ))}
          </div>
        </Card>
      )}

      {/* Career Progression */}
      <Card title="Lộ trình phát triển">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text>
              Từ vị trí {position.name}, bạn có thể phát triển theo các hướng sau:
            </Text>
          </Col>
          <Col span={24}>
            <List
              dataSource={[
                'Nâng cấp lên cấp bậc cao hơn trong cùng lĩnh vực',
                'Chuyển sang lĩnh vực liên quan',
                'Phát triển kỹ năng quản lý',
                'Chuyên sâu về kỹ thuật'
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>• {item}</Text>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>

      {/* Actions */}
      <Card>
        <Row justify="center">
          <Col>
            <Space>
              {!isCurrentPosition && (
                <Button type="primary" onClick={onTransferClick}>
                  Yêu cầu chuyển đến vị trí này
                </Button>
              )}
              <Button>
                Xem chi tiết lộ trình
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PositionDetails;
