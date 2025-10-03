// Example usage of unified flat data structure utilities
import { flatDataUtils, SkillItem, SkillCategory, SkillDetail } from './mockSkillData';

// Example unified data (categories + details in one structure)
const exampleItems: SkillItem[] = [
  // Categories
  { id: '1', name: 'Trách nhiệm', code: 'RESPONSIBILITY', level: 1, parent_id: null, order_index: 1, type: 'category' },
  { id: '2', name: 'Bằng cấp', code: 'DEGREE', level: 2, parent_id: '1', order_index: 1, type: 'category' },
  { id: '3', name: 'Yêu cầu về trình độ', code: 'DEGREE_REQ', level: 3, parent_id: '2', order_index: 1, type: 'category' },
  { id: '4', name: 'Chứng chỉ ngoại ngữ', code: 'LANGUAGE_CERT', level: 2, parent_id: '1', order_index: 2, type: 'category' },
  { id: '5', name: 'Chứng chỉ chuyên môn', code: 'LANGUAGE_SPECIALIZED', level: 3, parent_id: '4', order_index: 1, type: 'category' },
  
  // Details
  { 
    id: 'd1', 
    name: 'Bậc 13 (CNTT12)', 
    code: 'DEGREE_REQ_CNTT12', 
    level: 4, 
    parent_id: '3', 
    order_index: 1, 
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT12)',
    requirements: [
      { type: 'text', value: '- Có khả năng ứng dụng các công việc cấp level 2' },
      { type: 'text', value: '- Tìm nguyên nhân tối ưu hóa' },
    ]
  },
  { 
    id: 'd2', 
    name: 'Bậc 13 (CNTT24)', 
    code: 'DEGREE_REQ_CNTT24', 
    level: 4, 
    parent_id: '3', 
    order_index: 2, 
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT24)',
    requirements: [
      { type: 'text', value: '- Chủ trách nhiệm số dụng' },
    ]
  },
];

// Example usage of unified utility functions
export const unifiedDataExamples = {
  // Tìm tất cả children của "Trách nhiệm" (id: '1') - cả category và detail
  getResponsibilityChildren: () => {
    const children = flatDataUtils.getChildren(exampleItems, '1');
    console.log('All children of Trách nhiệm:', children);
    // Result: [Bằng cấp, Chứng chỉ ngoại ngữ]
    return children;
  },

  // Tìm chỉ category children của "Trách nhiệm"
  getResponsibilityCategoryChildren: () => {
    const children = flatDataUtils.getChildrenByType(exampleItems, '1', 'category');
    console.log('Category children of Trách nhiệm:', children);
    // Result: [Bằng cấp, Chứng chỉ ngoại ngữ]
    return children;
  },

  // Tìm details của "Yêu cầu về trình độ" (id: '3')
  getDegreeReqDetails: () => {
    const details = flatDataUtils.getDetailsForCategory(exampleItems, '3');
    console.log('Details of Yêu cầu về trình độ:', details);
    // Result: [Bậc 13 (CNTT12), Bậc 13 (CNTT24)]
    return details;
  },

  // Tìm tất cả items theo type
  getAllCategories: () => {
    const categories = flatDataUtils.getItemsByType(exampleItems, 'category');
    console.log('All categories:', categories);
    return categories;
  },

  getAllDetails: () => {
    const details = flatDataUtils.getItemsByType(exampleItems, 'detail');
    console.log('All details:', details);
    return details;
  },

  // Tìm tất cả descendants của "Trách nhiệm"
  getResponsibilityDescendants: () => {
    const descendants = flatDataUtils.getDescendants(exampleItems, '1');
    console.log('All descendants of Trách nhiệm:', descendants);
    // Result: [Bằng cấp, Chứng chỉ ngoại ngữ, Yêu cầu về trình độ, Chứng chỉ chuyên môn, details...]
    return descendants;
  },

  // Tìm parent của detail "Bậc 13 (CNTT12)" (id: 'd1')
  getDetailParent: () => {
    const parent = flatDataUtils.getParent(exampleItems, 'd1');
    console.log('Parent of Bậc 13 (CNTT12):', parent);
    // Result: Yêu cầu về trình độ
    return parent;
  },

  // Tìm tất cả ancestors của detail
  getDetailAncestors: () => {
    const ancestors = flatDataUtils.getAncestors(exampleItems, 'd1');
    console.log('Ancestors of Bậc 13 (CNTT12):', ancestors);
    // Result: [Trách nhiệm, Bằng cấp, Yêu cầu về trình độ]
    return ancestors;
  },

  // Tìm root nodes
  getRootNodes: () => {
    const roots = flatDataUtils.getRootNodes(exampleItems);
    console.log('Root nodes:', roots);
    // Result: [Trách nhiệm]
    return roots;
  },

  // Tìm leaf nodes (bao gồm cả details)
  getLeafNodes: () => {
    const leaves = flatDataUtils.getLeafNodes(exampleItems);
    console.log('Leaf nodes:', leaves);
    // Result: [Chứng chỉ chuyên môn, Bậc 13 (CNTT12), Bậc 13 (CNTT24)]
    return leaves;
  },

  // Tính level của một detail
  calculateDetailLevel: () => {
    const level = flatDataUtils.calculateLevel(exampleItems, 'd1');
    console.log('Calculated level of Bậc 13 (CNTT12):', level);
    // Result: 4
    return level;
  },

  // Tìm max level (bao gồm cả details)
  getMaxLevel: () => {
    const maxLevel = flatDataUtils.getMaxLevel(exampleItems);
    console.log('Max level:', maxLevel);
    // Result: 4
    return maxLevel;
  },

  // Chuyển về old structure để backward compatibility
  toOldStructure: () => {
    const categories = flatDataUtils.toCategories(exampleItems);
    const details = flatDataUtils.toDetails(exampleItems);
    console.log('Old structure - Categories:', categories);
    console.log('Old structure - Details:', details);
    return { categories, details };
  },

  // Build unified tree structure
  buildUnifiedTree: () => {
    const tree = flatDataUtils.buildUnifiedTree(exampleItems);
    console.log('Unified tree structure:', JSON.stringify(tree, null, 2));
    return tree;
  },

  // Demo: Tìm tất cả siblings của một node
  getSiblings: (nodeId: string) => {
    const node = exampleItems.find(item => item.id === nodeId);
    if (!node) return [];
    
    if (node.parent_id === null) {
      // Root node - siblings are other root nodes
      return flatDataUtils.getRootNodes(exampleItems).filter(item => item.id !== nodeId);
    } else {
      // Non-root node - siblings are other children of the same parent
      return flatDataUtils.getChildren(exampleItems, node.parent_id).filter(item => item.id !== nodeId);
    }
  },

  // Demo: Kiểm tra xem node A có phải là ancestor của node B không
  isAncestor: (ancestorId: string, descendantId: string): boolean => {
    const ancestors = flatDataUtils.getAncestors(exampleItems, descendantId);
    return ancestors.some(ancestor => ancestor.id === ancestorId);
  },

  // Demo: Tìm đường dẫn từ root đến node
  getPathFromRoot: (nodeId: string): SkillItem[] => {
    const ancestors = flatDataUtils.getAncestors(exampleItems, nodeId);
    const node = exampleItems.find(item => item.id === nodeId);
    return node ? [...ancestors, node] : [];
  },

  // Demo: Tìm depth của một node (khoảng cách từ root)
  getDepth: (nodeId: string): number => {
    return flatDataUtils.getAncestors(exampleItems, nodeId).length;
  }
};

// Usage examples:
/*
// Sử dụng trong component:
import { flatDataExamples } from './flatDataExample';

// Trong component
const children = flatDataExamples.getResponsibilityChildren();
const isParent = flatDataExamples.isAncestor('1', '3'); // true
const path = flatDataExamples.getPathFromRoot('3'); // [Trách nhiệm, Bằng cấp, Yêu cầu về trình độ]
const depth = flatDataExamples.getDepth('3'); // 2
*/
