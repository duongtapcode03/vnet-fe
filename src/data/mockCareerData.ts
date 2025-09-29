import { CareerPath, UserProfile, CareerPosition, CareerTransition, CAREER_LEVELS, CAREER_ROLES } from '@/types/career';

// Mock Career Positions
export const mockPositions: CareerPosition[] = [
  // Level 11
  { 
    id: 'mdev1', 
    name: 'M DEV1', 
    level: 11, 
    role: CAREER_ROLES.MOBILE_DEVELOPER,
    description: 'Mobile Developer cấp độ 1 - Phát triển ứng dụng mobile cơ bản',
    requirements: ['React Native', 'Flutter', 'iOS/Android development'],
    skills: ['JavaScript', 'TypeScript', 'Mobile UI/UX']
  },
  { 
    id: 'fdev1', 
    name: 'F DEV1', 
    level: 11, 
    role: CAREER_ROLES.FULLSTACK_DEVELOPER,
    description: 'FullStack Developer cấp độ 1 - Phát triển ứng dụng web full-stack',
    requirements: ['React', 'Node.js', 'Database design'],
    skills: ['JavaScript', 'HTML/CSS', 'SQL']
  },
  { 
    id: 'tester1', 
    name: 'TESTER1', 
    level: 11, 
    role: CAREER_ROLES.SOFTWARE_TESTER,
    description: 'Software Tester cấp độ 1 - Kiểm thử phần mềm cơ bản',
    requirements: ['Manual testing', 'Test case design'],
    skills: ['Testing methodologies', 'Bug tracking']
  },
  { 
    id: 'qa1', 
    name: 'QA1', 
    level: 11, 
    role: CAREER_ROLES.QUALITY_ASSURANCE,
    description: 'Quality Assurance cấp độ 1 - Đảm bảo chất lượng sản phẩm',
    requirements: ['Quality standards', 'Process improvement'],
    skills: ['Quality management', 'Process analysis']
  },
  { 
    id: 'de1', 
    name: 'DE1', 
    level: 11, 
    role: CAREER_ROLES.DATA_ENGINEER,
    description: 'Data Engineer cấp độ 1 - Xử lý và quản lý dữ liệu',
    requirements: ['SQL', 'Python', 'Data pipelines'],
    skills: ['Database management', 'ETL processes']
  },
  
  // Level 12
  { 
    id: 'se1', 
    name: 'SE1', 
    level: 12, 
    role: CAREER_ROLES.SOLUTION_ENGINEER,
    description: 'Solution Engineer cấp độ 1 - Thiết kế giải pháp kỹ thuật',
    requirements: ['System design', 'Architecture patterns'],
    skills: ['System architecture', 'Technical consulting']
  },
  { 
    id: 'mdev2', 
    name: 'M DEV2', 
    level: 12, 
    role: CAREER_ROLES.MOBILE_DEVELOPER,
    description: 'Mobile Developer cấp độ 2 - Phát triển ứng dụng mobile nâng cao',
    requirements: ['Advanced mobile frameworks', 'Performance optimization'],
    skills: ['Advanced JavaScript', 'Mobile performance', 'Cross-platform development']
  },
  { 
    id: 'fdev2', 
    name: 'F DEV2', 
    level: 12, 
    role: CAREER_ROLES.FULLSTACK_DEVELOPER,
    description: 'FullStack Developer cấp độ 2 - Phát triển ứng dụng web phức tạp',
    requirements: ['Microservices', 'Cloud platforms'],
    skills: ['Advanced React', 'Backend development', 'DevOps basics']
  },
  { 
    id: 'tester2', 
    name: 'TESTER2', 
    level: 12, 
    role: CAREER_ROLES.SOFTWARE_TESTER,
    description: 'Software Tester cấp độ 2 - Kiểm thử tự động và nâng cao',
    requirements: ['Automated testing', 'Performance testing'],
    skills: ['Selenium', 'Test automation', 'Performance testing tools']
  },
  { 
    id: 'qa2', 
    name: 'QA2', 
    level: 12, 
    role: CAREER_ROLES.QUALITY_ASSURANCE,
    description: 'Quality Assurance cấp độ 2 - Quản lý chất lượng nâng cao',
    requirements: ['Quality metrics', 'Process optimization'],
    skills: ['Quality metrics', 'Process improvement', 'Team leadership']
  },
  { 
    id: 'de2', 
    name: 'DE2', 
    level: 12, 
    role: CAREER_ROLES.DATA_ENGINEER,
    description: 'Data Engineer cấp độ 2 - Xây dựng hệ thống dữ liệu phức tạp',
    requirements: ['Big data technologies', 'Cloud data platforms'],
    skills: ['Apache Spark', 'Kafka', 'Cloud data services']
  },
  { 
    id: 'ds1', 
    name: 'DS1', 
    level: 12, 
    role: CAREER_ROLES.DATA_SCIENTIST,
    description: 'Data Scientist cấp độ 1 - Phân tích dữ liệu và machine learning',
    requirements: ['Machine learning', 'Statistical analysis'],
    skills: ['Python', 'R', 'Machine learning algorithms']
  },
  
  // Level 13
  { 
    id: 'pm1', 
    name: 'PM1', 
    level: 13, 
    role: CAREER_ROLES.PROJECT_MANAGER,
    description: 'Project Manager cấp độ 1 - Quản lý dự án phần mềm',
    requirements: ['Project management', 'Team leadership'],
    skills: ['Agile/Scrum', 'Team management', 'Project planning']
  },
  { 
    id: 'se2', 
    name: 'SE2', 
    level: 13, 
    role: CAREER_ROLES.SOLUTION_ENGINEER,
    description: 'Solution Engineer cấp độ 2 - Thiết kế giải pháp enterprise',
    requirements: ['Enterprise architecture', 'Scalability design'],
    skills: ['Enterprise patterns', 'Scalability', 'Security']
  },
  { 
    id: 'mdev3', 
    name: 'M DEV3', 
    level: 13, 
    role: CAREER_ROLES.MOBILE_DEVELOPER,
    description: 'Mobile Developer cấp độ 3 - Chuyên gia mobile development',
    requirements: ['Advanced mobile architecture', 'Team leadership'],
    skills: ['Mobile architecture', 'Team leadership', 'Technical mentoring']
  },
  { 
    id: 'fdev3', 
    name: 'F DEV3', 
    level: 13, 
    role: CAREER_ROLES.FULLSTACK_DEVELOPER,
    description: 'FullStack Developer cấp độ 3 - Chuyên gia full-stack development',
    requirements: ['Advanced system design', 'Team leadership'],
    skills: ['System design', 'Team leadership', 'Technical mentoring']
  },
  { 
    id: 'tester3', 
    name: 'TESTER3', 
    level: 13, 
    role: CAREER_ROLES.SOFTWARE_TESTER,
    description: 'Software Tester cấp độ 3 - Chuyên gia testing',
    requirements: ['Test strategy', 'Team leadership'],
    skills: ['Test strategy', 'Team leadership', 'Quality assurance']
  },
  { 
    id: 'qa3', 
    name: 'QA3', 
    level: 13, 
    role: CAREER_ROLES.QUALITY_ASSURANCE,
    description: 'Quality Assurance cấp độ 3 - Chuyên gia quality management',
    requirements: ['Quality strategy', 'Process innovation'],
    skills: ['Quality strategy', 'Process innovation', 'Team leadership']
  },
  { 
    id: 'de3', 
    name: 'DE3', 
    level: 13, 
    role: CAREER_ROLES.DATA_ENGINEER,
    description: 'Data Engineer cấp độ 3 - Chuyên gia data engineering',
    requirements: ['Data architecture', 'Team leadership'],
    skills: ['Data architecture', 'Team leadership', 'Data strategy']
  },
  { 
    id: 'ds2', 
    name: 'DS2', 
    level: 13, 
    role: CAREER_ROLES.DATA_SCIENTIST,
    description: 'Data Scientist cấp độ 2 - Chuyên gia data science',
    requirements: ['Advanced ML', 'Business intelligence'],
    skills: ['Advanced ML', 'Business intelligence', 'Data visualization']
  },
  
  // Level 14
  { 
    id: 'pm2', 
    name: 'PM2', 
    level: 14, 
    role: CAREER_ROLES.PROJECT_MANAGER,
    description: 'Project Manager cấp độ 2 - Quản lý dự án lớn',
    requirements: ['Large project management', 'Stakeholder management'],
    skills: ['Large project management', 'Stakeholder management', 'Risk management']
  },
  { 
    id: 'se3', 
    name: 'SE3', 
    level: 14, 
    role: CAREER_ROLES.SOLUTION_ENGINEER,
    description: 'Solution Engineer cấp độ 3 - Kiến trúc sư giải pháp',
    requirements: ['Solution architecture', 'Technical leadership'],
    skills: ['Solution architecture', 'Technical leadership', 'Innovation']
  },
  { 
    id: 'mdev4', 
    name: 'M DEV4', 
    level: 14, 
    role: CAREER_ROLES.MOBILE_DEVELOPER,
    description: 'Mobile Developer cấp độ 4 - Lead mobile developer',
    requirements: ['Mobile strategy', 'Technical leadership'],
    skills: ['Mobile strategy', 'Technical leadership', 'Innovation']
  },
  { 
    id: 'fdev4', 
    name: 'F DEV4', 
    level: 14, 
    role: CAREER_ROLES.FULLSTACK_DEVELOPER,
    description: 'FullStack Developer cấp độ 4 - Lead full-stack developer',
    requirements: ['Full-stack strategy', 'Technical leadership'],
    skills: ['Full-stack strategy', 'Technical leadership', 'Innovation']
  },
  { 
    id: 'de4', 
    name: 'DE4', 
    level: 14, 
    role: CAREER_ROLES.DATA_ENGINEER,
    description: 'Data Engineer cấp độ 4 - Lead data engineer',
    requirements: ['Data strategy', 'Technical leadership'],
    skills: ['Data strategy', 'Technical leadership', 'Innovation']
  },
  { 
    id: 'ds3', 
    name: 'DS3', 
    level: 14, 
    role: CAREER_ROLES.DATA_SCIENTIST,
    description: 'Data Scientist cấp độ 3 - Lead data scientist',
    requirements: ['Data science strategy', 'Business impact'],
    skills: ['Data science strategy', 'Business impact', 'Innovation']
  },
  
  // Level 15
  { 
    id: 'pm3', 
    name: 'PM3', 
    level: 15, 
    role: CAREER_ROLES.PROJECT_MANAGER,
    description: 'Project Manager cấp độ 3 - Senior project manager',
    requirements: ['Portfolio management', 'Strategic planning'],
    skills: ['Portfolio management', 'Strategic planning', 'Leadership']
  },
  { 
    id: 'se4', 
    name: 'SE4', 
    level: 15, 
    role: CAREER_ROLES.SOLUTION_ENGINEER,
    description: 'Solution Engineer cấp độ 4 - Principal solution engineer',
    requirements: ['Principal architecture', 'Strategic technical leadership'],
    skills: ['Principal architecture', 'Strategic technical leadership', 'Innovation']
  },
  
  // Level 16
  { 
    id: 'pm4', 
    name: 'PM4', 
    level: 16, 
    role: CAREER_ROLES.PROJECT_MANAGER,
    description: 'Project Manager cấp độ 4 - Director of project management',
    requirements: ['Program management', 'Executive leadership'],
    skills: ['Program management', 'Executive leadership', 'Strategic vision']
  },
  
  // Level 17
  { 
    id: 'architect', 
    name: 'Network Architect', 
    level: 17, 
    role: CAREER_ROLES.NETWORK_ARCHITECT,
    description: 'Network Architect - Kiến trúc sư hệ thống mạng',
    requirements: ['Network architecture', 'Strategic technical vision'],
    skills: ['Network architecture', 'Strategic technical vision', 'Innovation leadership']
  },
  { 
    id: 'ds4', 
    name: 'DS4', 
    level: 17, 
    role: CAREER_ROLES.DATA_SCIENTIST,
    description: 'Data Scientist cấp độ 4 - Chief data scientist',
    requirements: ['Data science strategy', 'Executive leadership'],
    skills: ['Data science strategy', 'Executive leadership', 'Innovation']
  },
];

// Mock Career Transitions
export const mockTransitions: CareerTransition[] = [
  // Horizontal transitions (same level)
  { id: 't1', fromPosition: 'mdev1', toPosition: 'fdev1', type: 'horizontal', timeRequired: 6 },
  { id: 't2', fromPosition: 'tester1', toPosition: 'qa1', type: 'horizontal', timeRequired: 3 },
  { id: 't3', fromPosition: 'mdev2', toPosition: 'fdev2', type: 'horizontal', timeRequired: 6 },
  { id: 't4', fromPosition: 'tester2', toPosition: 'qa2', type: 'horizontal', timeRequired: 3 },
  
  // Vertical transitions (level up)
  { id: 't5', fromPosition: 'mdev1', toPosition: 'mdev2', type: 'vertical', timeRequired: 12 },
  { id: 't6', fromPosition: 'fdev1', toPosition: 'fdev2', type: 'vertical', timeRequired: 12 },
  { id: 't7', fromPosition: 'tester1', toPosition: 'tester2', type: 'vertical', timeRequired: 12 },
  { id: 't8', fromPosition: 'qa1', toPosition: 'qa2', type: 'vertical', timeRequired: 12 },
  { id: 't9', fromPosition: 'de1', toPosition: 'de2', type: 'vertical', timeRequired: 12 },
  
  // Diagonal transitions (cross-role)
  { id: 't10', fromPosition: 'mdev4', toPosition: 'pm3', type: 'diagonal', timeRequired: 18 },
  { id: 't11', fromPosition: 'fdev4', toPosition: 'pm3', type: 'diagonal', timeRequired: 18 },
  { id: 't12', fromPosition: 'se3', toPosition: 'pm3', type: 'diagonal', timeRequired: 12 },
  { id: 't13', fromPosition: 'de4', toPosition: 'pm3', type: 'diagonal', timeRequired: 18 },
  { id: 't14', fromPosition: 'ds3', toPosition: 'pm3', type: 'diagonal', timeRequired: 18 },
];

// Mock Career Path
export const mockCareerPath: CareerPath = {
  id: 'oss-software-system',
  name: 'Lộ trình nghề nghiệp OSS Software System',
  field: 'OSS Software System',
  positions: mockPositions,
  transitions: mockTransitions
};

// Mock User Profiles
export const mockUserProfiles: UserProfile[] = [
  {
    id: 'profile-1',
    userId: 'user-123',
    currentPosition: mockPositions.find(p => p.id === 'fdev2'),
    careerHistory: [
      {
        id: 'history-1',
        position: mockPositions.find(p => p.id === 'fdev1')!,
        startDate: '2022-01-01',
        endDate: '2023-01-01',
        isCurrent: false,
        achievements: ['Hoàn thành dự án CRM', 'Được đánh giá xuất sắc']
      },
      {
        id: 'history-2',
        position: mockPositions.find(p => p.id === 'fdev2')!,
        startDate: '2023-01-01',
        isCurrent: true,
        achievements: ['Lead team 5 người', 'Tối ưu performance 40%']
      }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
    experience: 3,
    education: 'Đại học Công nghệ thông tin',
    certifications: ['AWS Certified Developer', 'Scrum Master']
  },
  {
    id: 'profile-2',
    userId: 'user-456',
    currentPosition: mockPositions.find(p => p.id === 'pm1'),
    careerHistory: [
      {
        id: 'history-3',
        position: mockPositions.find(p => p.id === 'tester2')!,
        startDate: '2021-06-01',
        endDate: '2023-06-01',
        isCurrent: false,
        achievements: ['Tự động hóa 80% test cases', 'Giảm bug rate 50%']
      },
      {
        id: 'history-4',
        position: mockPositions.find(p => p.id === 'pm1')!,
        startDate: '2023-06-01',
        isCurrent: true,
        achievements: ['Quản lý 3 dự án đồng thời', 'Team 12 người']
      }
    ],
    skills: ['Project Management', 'Agile/Scrum', 'Team Leadership', 'Risk Management'],
    experience: 4,
    education: 'Thạc sĩ Quản trị kinh doanh',
    certifications: ['PMP', 'Scrum Master', 'ITIL']
  },
  {
    id: 'profile-3',
    userId: 'user-789',
    // No current position - for testing "no profile" scenario
    careerHistory: [],
    skills: [],
    experience: 0,
    education: '',
    certifications: []
  }
];

// Mock Position Transfer Requests
export const mockTransferRequests = [
  {
    id: 'transfer-1',
    userId: 'user-123',
    fromPositionId: 'fdev2',
    toPositionId: 'se3',
    reason: 'Muốn chuyển sang lĩnh vực Solution Engineering để phát triển kỹ năng kiến trúc hệ thống',
    requestedDate: '2024-01-15T00:00:00Z',
    status: 'pending' as const
  },
  {
    id: 'transfer-2',
    userId: 'user-456',
    fromPositionId: 'pm1',
    toPositionId: 'pm2',
    reason: 'Đã có đủ kinh nghiệm và muốn thử thách với các dự án lớn hơn',
    requestedDate: '2024-01-10T00:00:00Z',
    status: 'approved' as const
  }
];

// Helper functions
export const getUserProfile = (userId: string): UserProfile | undefined => {
  return mockUserProfiles.find(profile => profile.userId === userId);
};

export const getPositionById = (positionId: string): CareerPosition | undefined => {
  return mockPositions.find(position => position.id === positionId);
};

export const getCareerPath = (field: string): CareerPath | undefined => {
  if (field === 'OSS Software System') {
    return mockCareerPath;
  }
  return undefined;
};

export const getTransferRequests = (userId: string) => {
  return mockTransferRequests.filter(request => request.userId === userId);
};

