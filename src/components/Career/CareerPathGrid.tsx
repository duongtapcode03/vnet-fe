import React from 'react';
import { Card, Row, Col, Button, Tooltip } from 'antd';
import { CareerPath, CareerPosition, UserProfile, CAREER_LEVELS, CAREER_ROLES } from '@/types/career';

interface CareerPathGridProps {
  careerPath: CareerPath;
  currentPosition?: CareerPosition;
  selectedPosition?: CareerPosition | null;
  onPositionClick: (position: CareerPosition) => void;
  getPositionColor: (position: CareerPosition) => string;
}

const CareerPathGrid: React.FC<CareerPathGridProps> = ({
  careerPath,
  currentPosition,
  selectedPosition,
  onPositionClick,
  getPositionColor
}) => {
  // Define the grid structure based on the image
  const gridStructure = {
    11: ['M DEV1', 'F DEV1', 'TESTER1', 'QA1', 'DE1'],
    12: ['SE1', 'M DEV2', 'F DEV2', 'TESTER2', 'QA2', 'DE2', 'DS1'],
    13: ['PM1', 'SE2', 'M DEV3', 'F DEV3', 'TESTER3', 'QA3', 'DE3', 'DS2'],
    HRL: [],
    14: ['PM2', 'SE3', 'M DEV4', 'F DEV4', 'DE4', 'DS3'],
    15: ['PM3', 'SE4'],
    16: ['PM4'],
    17: ['Network Architect', 'DS4']
  };

  // Mock positions data - in real app, this would come from API
  const mockPositions: CareerPosition[] = [
    // Level 11
    { id: 'mdev1', name: 'M DEV1', level: 11, role: CAREER_ROLES.MOBILE_DEVELOPER },
    { id: 'fdev1', name: 'F DEV1', level: 11, role: CAREER_ROLES.FULLSTACK_DEVELOPER },
    { id: 'tester1', name: 'TESTER1', level: 11, role: CAREER_ROLES.SOFTWARE_TESTER },
    { id: 'qa1', name: 'QA1', level: 11, role: CAREER_ROLES.QUALITY_ASSURANCE },
    { id: 'de1', name: 'DE1', level: 11, role: CAREER_ROLES.DATA_ENGINEER },
    
    // Level 12
    { id: 'se1', name: 'SE1', level: 12, role: CAREER_ROLES.SOLUTION_ENGINEER },
    { id: 'mdev2', name: 'M DEV2', level: 12, role: CAREER_ROLES.MOBILE_DEVELOPER },
    { id: 'fdev2', name: 'F DEV2', level: 12, role: CAREER_ROLES.FULLSTACK_DEVELOPER },
    { id: 'tester2', name: 'TESTER2', level: 12, role: CAREER_ROLES.SOFTWARE_TESTER },
    { id: 'qa2', name: 'QA2', level: 12, role: CAREER_ROLES.QUALITY_ASSURANCE },
    { id: 'de2', name: 'DE2', level: 12, role: CAREER_ROLES.DATA_ENGINEER },
    { id: 'ds1', name: 'DS1', level: 12, role: CAREER_ROLES.DATA_SCIENTIST },
    
    // Level 13
    { id: 'pm1', name: 'PM1', level: 13, role: CAREER_ROLES.PROJECT_MANAGER },
    { id: 'se2', name: 'SE2', level: 13, role: CAREER_ROLES.SOLUTION_ENGINEER },
    { id: 'mdev3', name: 'M DEV3', level: 13, role: CAREER_ROLES.MOBILE_DEVELOPER },
    { id: 'fdev3', name: 'F DEV3', level: 13, role: CAREER_ROLES.FULLSTACK_DEVELOPER },
    { id: 'tester3', name: 'TESTER3', level: 13, role: CAREER_ROLES.SOFTWARE_TESTER },
    { id: 'qa3', name: 'QA3', level: 13, role: CAREER_ROLES.QUALITY_ASSURANCE },
    { id: 'de3', name: 'DE3', level: 13, role: CAREER_ROLES.DATA_ENGINEER },
    { id: 'ds2', name: 'DS2', level: 13, role: CAREER_ROLES.DATA_SCIENTIST },
    
    // Level 14
    { id: 'pm2', name: 'PM2', level: 14, role: CAREER_ROLES.PROJECT_MANAGER },
    { id: 'se3', name: 'SE3', level: 14, role: CAREER_ROLES.SOLUTION_ENGINEER },
    { id: 'mdev4', name: 'M DEV4', level: 14, role: CAREER_ROLES.MOBILE_DEVELOPER },
    { id: 'fdev4', name: 'F DEV4', level: 14, role: CAREER_ROLES.FULLSTACK_DEVELOPER },
    { id: 'de4', name: 'DE4', level: 14, role: CAREER_ROLES.DATA_ENGINEER },
    { id: 'ds3', name: 'DS3', level: 14, role: CAREER_ROLES.DATA_SCIENTIST },
    
    // Level 15
    { id: 'pm3', name: 'PM3', level: 15, role: CAREER_ROLES.PROJECT_MANAGER },
    { id: 'se4', name: 'SE4', level: 15, role: CAREER_ROLES.SOLUTION_ENGINEER },
    
    // Level 16
    { id: 'pm4', name: 'PM4', level: 16, role: CAREER_ROLES.PROJECT_MANAGER },
    
    // Level 17
    { id: 'architect', name: 'Network Architect', level: 17, role: CAREER_ROLES.NETWORK_ARCHITECT },
    { id: 'ds4', name: 'DS4', level: 17, role: CAREER_ROLES.DATA_SCIENTIST },
  ];

  const getPositionByName = (name: string) => {
    return mockPositions.find(pos => pos.name === name);
  };

  const renderPositionButton = (position: CareerPosition | undefined, level: string | number) => {
    if (!position) return <div style={{ width: 100, height: 40 }} />;
    
    const isCurrent = currentPosition?.id === position.id;
    const isSelected = selectedPosition?.id === position.id;
    
    return (
      <Tooltip title={`${position.name} - ${position.role.name}`} key={position.id}>
        <Button
          type={isCurrent ? 'primary' : isSelected ? 'default' : 'default'}
          style={{
            backgroundColor: getPositionColor(position),
            borderColor: getPositionColor(position),
            color: isCurrent || isSelected ? 'white' : 'black',
            fontWeight: isCurrent ? 'bold' : 'normal',
            minWidth: 100,
            height: 40,
            margin: 2,
          }}
          onClick={() => onPositionClick(position)}
        >
          {position.name}
        </Button>
      </Tooltip>
    );
  };

  const renderLevel = (level: string | number, positions: string[]) => {
    return (
      <Row key={level} gutter={[8, 8]} style={{ marginBottom: 16 }}>
        <Col span={3}>
          <div style={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            padding: '10px 0',
            backgroundColor: '#f5f5f5',
            borderRadius: 4
          }}>
            {typeof level === 'number' ? CAREER_LEVELS[level as keyof typeof CAREER_LEVELS] : level}
          </div>
        </Col>
        <Col span={21}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {positions.map(positionName => 
              renderPositionButton(getPositionByName(positionName), level)
            )}
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        <Col span={3}>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Cấp bậc</div>
        </Col>
        <Col span={21}>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Vị trí công việc</div>
        </Col>
      </Row>

      {/* Career Levels */}
      {Object.entries(gridStructure).map(([level, positions]) => 
        renderLevel(level, positions)
      )}

      {/* Legend */}
      <div style={{ marginTop: 24, padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
        <h4>Chú thích:</h4>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, backgroundColor: '#52c41a', borderRadius: 4 }} />
            <span>Vị trí hiện tại</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, backgroundColor: '#1890ff', borderRadius: 4 }} />
            <span>Vị trí được chọn</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, backgroundColor: '#f0f0f0', borderRadius: 4 }} />
            <span>Vị trí khác</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathGrid;
