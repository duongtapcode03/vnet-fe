// Shared types for HierarchicalCRUD components
import { SkillDetail } from '@/services/mockSkillData';

export interface CategoryNode {
  id: string;
  name: string;
  code: string;
  level: number;
  parent_id: string | null;
  order_index: number;
  description?: string;
  children?: CategoryNode[];
  details?: SkillDetail[];
}

export interface CategoryFormData {
  name: string;
  code: string;
  description?: string;
  order_index: number;
  parent_id?: string;
}

export interface DetailFormData {
  skill_level: string;
  requirements: string; // JSON string
}

export interface TreeNodeData {
  key: string;
  title: React.ReactNode;
  children?: TreeNodeData[];
}
