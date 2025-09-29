export interface CareerPosition {
  id: string;
  name: string;
  level: number;
  role: CareerRole;
  description?: string;
  requirements?: string[];
  skills?: string[];
}

export interface CareerRole {
  id: string;
  name: string;
  category: CareerCategory;
  subCategory?: string;
}

export interface CareerCategory {
  id: string;
  name: string;
  description: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  currentPosition?: CareerPosition;
  careerHistory: CareerHistory[];
  skills: string[];
  experience: number; // years
  education?: string;
  certifications?: string[];
}

export interface CareerHistory {
  id: string;
  position: CareerPosition;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  achievements?: string[];
}

export interface CareerPath {
  id: string;
  name: string;
  field: string; // "OSS Software System"
  positions: CareerPosition[];
  transitions: CareerTransition[];
}

export interface CareerTransition {
  id: string;
  fromPosition: string;
  toPosition: string;
  type: 'horizontal' | 'vertical' | 'diagonal';
  requirements?: string[];
  timeRequired?: number; // months
}

export interface PositionTransferRequest {
  userId: string;
  fromPositionId: string;
  toPositionId: string;
  reason: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Career levels mapping
export const CAREER_LEVELS = {
  11: 'Bậc 11',
  12: 'Bậc 12', 
  13: 'Bậc 13',
  HRL: 'Bậc HRL',
  14: 'Bậc 14',
  15: 'Bậc 15',
  16: 'Bậc 16',
  17: 'Bậc 17'
} as const;

// Career roles mapping
export const CAREER_ROLES = {
  NETWORK_ARCHITECT: { id: 'architect', name: 'Kiến trúc sư', category: 'architecture' },
  PROJECT_MANAGER: { id: 'pm', name: 'Quản trị dự án phần mềm', category: 'management' },
  PRODUCT_MANAGER: { id: 'product', name: 'Trưởng sản phẩm', category: 'management' },
  SOLUTION_ENGINEER: { id: 'se', name: 'Giải pháp (SE)', category: 'engineering' },
  MOBILE_DEVELOPER: { id: 'mdev', name: 'Phát triển phần mềm (M DEV)', category: 'development' },
  FULLSTACK_DEVELOPER: { id: 'fdev', name: 'Phát triển phần mềm (F DEV)', category: 'development' },
  SOFTWARE_TESTER: { id: 'tester', name: 'Kiểm thử phần mềm', category: 'testing' },
  QUALITY_ASSURANCE: { id: 'qa', name: 'Quản lý chất lượng sản phẩm', category: 'quality' },
  DATA_ENGINEER: { id: 'de', name: 'Data Engineer', category: 'data' },
  DATA_SCIENTIST: { id: 'ds', name: 'Data Scientist', category: 'data' }
} as const;

