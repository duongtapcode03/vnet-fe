// Unified flat structure - gộp category và detail thành một
export interface SkillItem {
  id: string;
  name: string;
  code: string;
  level: number;
  parent_id: string | null;
  order_index: number;
  description?: string;
  
  // Detail fields (optional - chỉ có khi là skill detail)
  skill_level?: string;
  requirements?: Array<{ type: string; value: string }>;
  
  // Type để phân biệt category và detail
  type: 'category' | 'detail';
}

// Backward compatibility interfaces
export interface SkillCategory {
  id: string;
  name: string;
  code: string;
  level: number;
  parent_id: string | null;
  order_index: number;
  description?: string;
}

export interface SkillDetail {
  id: string;
  category_id: string;
  skill_level: string;
  requirements: Array<{ type: string; value: string }>;
}

// UNIFIED FLAT DATA STRUCTURE - Gộp categories và details thành một bảng duy nhất
let mockSkillItems: SkillItem[] = [
  // ROOT LEVEL (level 1) - Categories
  { 
    id: '1', 
    name: 'Trách nhiệm', 
    code: 'RESPONSIBILITY', 
    level: 1, 
    parent_id: null, 
    order_index: 1, 
    type: 'category' 
  },
  
  // LEVEL 2 - Categories (Children of 'Trách nhiệm')
  { 
    id: '2', 
    name: 'Bằng cấp', 
    code: 'DEGREE', 
    level: 2, 
    parent_id: '1', 
    order_index: 1, 
    type: 'category' 
  },
  { 
    id: '4', 
    name: 'Chứng chỉ ngoại ngữ', 
    code: 'LANGUAGE_CERT', 
    level: 2, 
    parent_id: '1', 
    order_index: 2, 
    type: 'category' 
  },
  { 
    id: '7', 
    name: 'Chứng chỉ nghiệp vụ', 
    code: 'PROFESSIONAL_CERT', 
    level: 2, 
    parent_id: '1', 
    order_index: 3, 
    type: 'category' 
  },
  
  // LEVEL 3 - Categories (Children of 'Bằng cấp')
  { 
    id: '3', 
    name: 'Yêu cầu về trình độ (đạt một trong các điều kiện)', 
    code: 'DEGREE_REQ', 
    level: 3, 
    parent_id: '2', 
    order_index: 1, 
    type: 'category' 
  },
  
  // LEVEL 3 - Categories (Children of 'Chứng chỉ ngoại ngữ')
  { 
    id: '5', 
    name: 'Chứng chỉ chuyên môn', 
    code: 'LANGUAGE_SPECIALIZED', 
    level: 3, 
    parent_id: '4', 
    order_index: 1, 
    type: 'category' 
  },
  { 
    id: '6', 
    name: 'Yêu cầu về chuyển ngành (đạt một trong các điều kiện)', 
    code: 'LANGUAGE_TRANSFER', 
    level: 3, 
    parent_id: '4', 
    order_index: 2, 
    type: 'category' 
  },
  
  // LEVEL 3 - Categories (Children of 'Chứng chỉ nghiệp vụ')
  { 
    id: '8', 
    name: 'Đạt 1 trong các chứng chỉ sau', 
    code: 'PROFESSIONAL_REQ', 
    level: 3, 
    parent_id: '7', 
    order_index: 1, 
    type: 'category' 
  },
  { 
    id: '9', 
    name: 'Apple beginner (Chứng chỉ quốc tế)', 
    code: 'APPLE_BEGINNER', 
    level: 3, 
    parent_id: '7', 
    order_index: 2, 
    type: 'category' 
  },
  { 
    id: '10', 
    name: 'Certified Scrum Master (CSM) (Chứng chỉ quốc tế)', 
    code: 'SCRUM_MASTER', 
    level: 3, 
    parent_id: '7', 
    order_index: 3, 
    type: 'category' 
  },
  { 
    id: '11', 
    name: 'Công cụ xử lý dữ liệu cơ bản sau', 
    code: 'DATA_TOOLS', 
    level: 3, 
    parent_id: '7', 
    order_index: 4, 
    type: 'category' 
  },
  { 
    id: '12', 
    name: 'Đạt 1 trong các chứng chỉ sau', 
    code: 'CERT_OPTION_1', 
    level: 3, 
    parent_id: '7', 
    order_index: 5, 
    type: 'category' 
  },
  { 
    id: '13', 
    name: 'Đạt 1 trong các chứng chỉ sau', 
    code: 'CERT_OPTION_2', 
    level: 3, 
    parent_id: '7', 
    order_index: 6, 
    type: 'category' 
  },
  { 
    id: '14', 
    name: 'Đạt 1 trong các chứng chỉ sau', 
    code: 'CERT_OPTION_3', 
    level: 3, 
    parent_id: '7', 
    order_index: 7, 
    type: 'category' 
  },

  // SKILL DETAILS - Details as children of categories
  // Details for 'Yêu cầu về trình độ' (id: '3')
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
      { type: 'text', value: '- Tìm nguyên nhân tối ưu hóa của từ vấn khác' },
      { type: 'text', value: '- Tối ưu hệ thống' },
      { type: 'text', value: '- Đáp ứng các yêu cầu level thấp hơn' },
      { type: 'text', value: '- Phối hợp với team leader để thực hiện các yêu cầu phát triển, cải tiến, nâng cấp' },
      { type: 'text', value: '- Hỗ trí theo kiểm tra đã có sẵn' },
      { type: 'text', value: '- Chủ trì hoặc hợp mã nguồn (merge code), kịch bản để thống nhất thống các ứng dụng mobile' },
      { type: 'text', value: '- Viết tài liệu hướng dẫn cài đặt, vận hành, khắc phục' },
      { type: 'text', value: '- Thực hiện Upcode các công cụ của các thành viên khác trong đội sự án' },
    ],
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
      { type: 'text', value: '- Chủ trách nhiệm số dụng, các đặc điểm kỹ thuật cần thiết đối với biết của' },
      { type: 'text', value: '- Bảo việc các vấn đề xử lý, kỹ thuật trong việc chuyển viên các học hoặc' },
      { type: 'text', value: '- Thống sản phẩm/dịch vụ, đặc phẩm/Tự/như từ đến vi...' },
    ],
  },

  // Details for 'Chứng chỉ chuyên môn' (id: '5')
  {
    id: 'd3',
    name: 'Bậc 13 (CNTT12)',
    code: 'LANG_SPEC_CNTT12',
    level: 4,
    parent_id: '5',
    order_index: 1,
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT12)',
    requirements: [
      { type: 'text', value: 'Yêu cầu về trình độ (đạt một trong các điều kiện)' },
      { type: 'text', value: '- Đại học' },
      { type: 'text', value: '- Thạc sỹ' },
    ],
  },
  {
    id: 'd4',
    name: 'Bậc 13 (CNTT24)',
    code: 'LANG_SPEC_CNTT24',
    level: 4,
    parent_id: '5',
    order_index: 2,
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT24)',
    requirements: [
      { type: 'text', value: 'Yêu cầu về trình độ đào tạo, các đặc điểm kỹ thuật cần thiết đối với biết của mục này là đặt một trong các điều kiện' },
    ],
  },

  // Details for 'Yêu cầu về chuyển ngành' (id: '6')
  {
    id: 'd5',
    name: 'Bậc 13 (CNTT12)',
    code: 'LANG_TRANS_CNTT12',
    level: 4,
    parent_id: '6',
    order_index: 1,
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT12)',
    requirements: [
      { type: 'text', value: '- Chuyên ngành CNTT' },
      { type: 'text', value: '- Chuyên ngành ĐTVT' },
    ],
  },
  {
    id: 'd6',
    name: 'Bậc 13 (CNTT24)',
    code: 'LANG_TRANS_CNTT24',
    level: 4,
    parent_id: '6',
    order_index: 2,
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT24)',
    requirements: [
      { type: 'text', value: '- Chuyên ngành Toán học ứng dụng' },
    ],
  },

  // Details for 'Đạt 1 trong các chứng chỉ sau' (id: '8')
  {
    id: 'd7',
    name: 'Bậc 13 (CNTT12)',
    code: 'PROF_REQ_CNTT12',
    level: 4,
    parent_id: '8',
    order_index: 1,
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT12)',
    requirements: [
      { type: 'text', value: '- TOEIC 700 điểm (Chứng chỉ quốc tế)' },
      { type: 'text', value: 'Đạt 1 trong các chứng chỉ sau' },
      { type: 'text', value: '- Flutter & Dart (Chứng chỉ quốc tế)' },
      { type: 'text', value: '- iOS cơ bản (Chứng chỉ quốc tế)' },
      { type: 'text', value: '- Android (Chứng chỉ quốc tế)' },
    ],
  },
  {
    id: 'd8',
    name: 'Bậc 13 (CNTT24)',
    code: 'PROF_REQ_CNTT24',
    level: 4,
    parent_id: '8',
    order_index: 2,
    type: 'detail',
    skill_level: 'Bậc 13 (CNTT24)',
    requirements: [
      { type: 'text', value: '- TOEIC 700 điểm (Chứng chỉ quốc tế)' },
      { type: 'text', value: 'Toán các thuật thống kê cơ bản - Mathematics for Machine Learning Specialization (Chứng chỉ quốc tế)' },
    ],
  },
];

// Backward compatibility - tách data từ unified structure
let mockCategories: SkillCategory[] = mockSkillItems
  .filter(item => item.type === 'category')
  .map(item => ({
    id: item.id,
    name: item.name,
    code: item.code,
    level: item.level,
    parent_id: item.parent_id,
    order_index: item.order_index,
    description: item.description,
  }));

let mockDetails: SkillDetail[] = mockSkillItems
  .filter(item => item.type === 'detail')
  .map(item => ({
    id: item.id,
    category_id: item.parent_id!,
    skill_level: item.skill_level!,
    requirements: item.requirements!,
  }));

let idCounter = 100;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility functions for unified flat data structure
export const flatDataUtils = {
  // Tìm tất cả children của một node (cả category và detail)
  getChildren: (items: SkillItem[], parentId: string): SkillItem[] => {
    return items
      .filter(item => item.parent_id === parentId)
      .sort((a, b) => a.order_index - b.order_index);
  },

  // Tìm children theo type
  getChildrenByType: (items: SkillItem[], parentId: string, type: 'category' | 'detail'): SkillItem[] => {
    return items
      .filter(item => item.parent_id === parentId && item.type === type)
      .sort((a, b) => a.order_index - b.order_index);
  },

  // Tìm tất cả descendants của một node
  getDescendants: (items: SkillItem[], parentId: string): SkillItem[] => {
    const children = flatDataUtils.getChildren(items, parentId);
    let descendants = [...children];
    
    children.forEach(child => {
      descendants = descendants.concat(flatDataUtils.getDescendants(items, child.id));
    });
    
    return descendants;
  },

  // Tìm parent của một node
  getParent: (items: SkillItem[], nodeId: string): SkillItem | null => {
    const node = items.find(item => item.id === nodeId);
    if (!node || !node.parent_id) return null;
    return items.find(item => item.id === node.parent_id) || null;
  },

  // Tìm tất cả ancestors của một node
  getAncestors: (items: SkillItem[], nodeId: string): SkillItem[] => {
    const ancestors: SkillItem[] = [];
    let currentNode = items.find(item => item.id === nodeId);
    
    while (currentNode && currentNode.parent_id) {
      const parent = items.find(item => item.id === currentNode!.parent_id);
      if (parent) {
        ancestors.unshift(parent);
        currentNode = parent;
      } else {
        break;
      }
    }
    
    return ancestors;
  },

  // Tìm root nodes
  getRootNodes: (items: SkillItem[]): SkillItem[] => {
    return items
      .filter(item => item.parent_id === null)
      .sort((a, b) => a.order_index - b.order_index);
  },

  // Tìm leaf nodes
  getLeafNodes: (items: SkillItem[]): SkillItem[] => {
    return items.filter(item => {
      return !items.some(child => child.parent_id === item.id);
    });
  },

  // Tìm items theo type
  getItemsByType: (items: SkillItem[], type: 'category' | 'detail'): SkillItem[] => {
    return items.filter(item => item.type === type);
  },

  // Tìm details của một category
  getDetailsForCategory: (items: SkillItem[], categoryId: string): SkillItem[] => {
    return items
      .filter(item => item.type === 'detail' && item.parent_id === categoryId)
      .sort((a, b) => a.order_index - b.order_index);
  },

  // Tính level tự động
  calculateLevel: (items: SkillItem[], nodeId: string): number => {
    const ancestors = flatDataUtils.getAncestors(items, nodeId);
    return ancestors.length + 1;
  },

  // Tìm max level
  getMaxLevel: (items: SkillItem[]): number => {
    return Math.max(...items.map(item => item.level));
  },

  // Backward compatibility - chuyển về old structure
  toCategories: (items: SkillItem[]): SkillCategory[] => {
    return items
      .filter(item => item.type === 'category')
      .map(item => ({
        id: item.id,
        name: item.name,
        code: item.code,
        level: item.level,
        parent_id: item.parent_id,
        order_index: item.order_index,
        description: item.description,
      }));
  },

  toDetails: (items: SkillItem[]): SkillDetail[] => {
    return items
      .filter(item => item.type === 'detail')
      .map(item => ({
        id: item.id,
        category_id: item.parent_id!,
        skill_level: item.skill_level!,
        requirements: item.requirements!,
      }));
  },

  // Chuyển flat data thành tree structure (backward compatibility)
  buildTree: (categories: SkillCategory[], details: SkillDetail[]): any[] => {
    const map = new Map<string, any>();

    // Tạo map với tất cả categories
    categories.forEach(cat => {
      map.set(cat.id, {
        ...cat,
        children: [],
        details: details.filter(d => d.category_id === cat.id)
      });
    });

    const tree: any[] = [];

    // Xây dựng tree structure
    categories.forEach(cat => {
      const node = map.get(cat.id);
      if (cat.parent_id === null) {
        tree.push(node);
      } else {
        const parent = map.get(cat.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return tree;
  },

  // New unified tree builder
  buildUnifiedTree: (items: SkillItem[]): any[] => {
    const map = new Map<string, any>();

    // Tạo map với tất cả items
    items.forEach(item => {
      map.set(item.id, {
        ...item,
        children: [],
        details: item.type === 'category' ? 
          items.filter(d => d.type === 'detail' && d.parent_id === item.id) : 
          undefined
      });
    });

    const tree: any[] = [];

    // Xây dựng tree structure
    items.forEach(item => {
      const node = map.get(item.id);
      if (item.parent_id === null) {
        tree.push(node);
      } else {
        const parent = map.get(item.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return tree;
  }
};

export const mockSkillAPI = {
  // NEW UNIFIED API METHODS
  async getAllItems(): Promise<SkillItem[]> {
    await delay(300);
    return [...mockSkillItems].sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return a.order_index - b.order_index;
    });
  },

  async getItemsByType(type: 'category' | 'detail'): Promise<SkillItem[]> {
    await delay(300);
    return mockSkillItems
      .filter(item => item.type === type)
      .sort((a, b) => a.order_index - b.order_index);
  },

  async getItemById(id: string): Promise<SkillItem | null> {
    await delay(300);
    return mockSkillItems.find(item => item.id === id) || null;
  },

  async createItem(item: Omit<SkillItem, 'id'>): Promise<SkillItem> {
    await delay(300);
    const newItem: SkillItem = {
      ...item,
      id: `item_${idCounter++}`,
    };
    mockSkillItems.push(newItem);
    
    // Update backward compatibility arrays
    if (newItem.type === 'category') {
      mockCategories = flatDataUtils.toCategories(mockSkillItems);
    } else {
      mockDetails = flatDataUtils.toDetails(mockSkillItems);
    }
    
    return newItem;
  },

  async updateItem(id: string, updates: Partial<SkillItem>): Promise<SkillItem> {
    await delay(300);
    const index = mockSkillItems.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Item not found');

    mockSkillItems[index] = { ...mockSkillItems[index], ...updates };
    
    // Update backward compatibility arrays
    mockCategories = flatDataUtils.toCategories(mockSkillItems);
    mockDetails = flatDataUtils.toDetails(mockSkillItems);
    
    return mockSkillItems[index];
  },

  async deleteItem(id: string): Promise<void> {
    await delay(300);

    const deleteRecursive = (itemId: string) => {
      const children = mockSkillItems.filter(item => item.parent_id === itemId);
      children.forEach(child => deleteRecursive(child.id));
      mockSkillItems = mockSkillItems.filter(item => item.id !== itemId);
    };

    deleteRecursive(id);
    
    // Update backward compatibility arrays
    mockCategories = flatDataUtils.toCategories(mockSkillItems);
    mockDetails = flatDataUtils.toDetails(mockSkillItems);
  },

  // BACKWARD COMPATIBILITY METHODS
  async getCategories(): Promise<SkillCategory[]> {
    await delay(300);
    return [...mockCategories].sort((a, b) => a.order_index - b.order_index);
  },

  async getDetails(): Promise<SkillDetail[]> {
    await delay(300);
    return [...mockDetails];
  },

  async createCategory(category: Omit<SkillCategory, 'id'>): Promise<SkillCategory> {
    await delay(300);
    const newCategory: SkillCategory = {
      ...category,
      id: `cat_${idCounter++}`,
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  async updateCategory(id: string, updates: Partial<SkillCategory>): Promise<SkillCategory> {
    await delay(300);
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');

    mockCategories[index] = { ...mockCategories[index], ...updates };
    return mockCategories[index];
  },

  async deleteCategory(id: string): Promise<void> {
    await delay(300);

    const deleteRecursive = (categoryId: string) => {
      const children = mockCategories.filter(c => c.parent_id === categoryId);
      children.forEach(child => deleteRecursive(child.id));

      mockCategories = mockCategories.filter(c => c.id !== categoryId);
      mockDetails = mockDetails.filter(d => d.category_id !== categoryId);
    };

    deleteRecursive(id);
  },

  async createDetail(detail: Omit<SkillDetail, 'id'>): Promise<SkillDetail> {
    await delay(300);
    const newDetail: SkillDetail = {
      ...detail,
      id: `detail_${idCounter++}`,
    };
    mockDetails.push(newDetail);
    return newDetail;
  },

  async updateDetail(id: string, updates: Partial<SkillDetail>): Promise<SkillDetail> {
    await delay(300);
    const index = mockDetails.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Detail not found');

    mockDetails[index] = { ...mockDetails[index], ...updates };
    return mockDetails[index];
  },

  async deleteDetail(id: string): Promise<void> {
    await delay(300);
    mockDetails = mockDetails.filter(d => d.id !== id);
  },
};
