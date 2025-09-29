// Utility functions for working with table data that has parent_id structure

export interface TableNode {
  id: string | number;
  parent_id: string | number | null;
  [key: string]: any;
}

/**
 * Tính toán level cho mỗi node dựa trên parent_id
 */
export function calculateNodeLevel(node: TableNode, allNodes: TableNode[]): number {
  if (node.parent_id === null) return 0;
  
  const parent = allNodes.find(n => n.id === node.parent_id);
  if (!parent) return 0;
  
  return calculateNodeLevel(parent, allNodes) + 1;
}

/**
 * Tính toán level cho tất cả nodes
 */
export function calculateAllLevels(nodes: TableNode[]): TableNode[] {
  return nodes.map(node => ({
    ...node,
    level: calculateNodeLevel(node, nodes)
  }));
}

/**
 * Xây dựng cây từ dữ liệu bảng có parent_id
 */
export function buildTreeFromTable(nodes: TableNode[]): TableNode[] {
  const map = new Map<string | number, TableNode>();
  const roots: TableNode[] = [];

  // Tạo map để lookup nhanh
  nodes.forEach(node => {
    map.set(node.id, { ...node, children: [] });
  });

  // Xây dựng cây
  nodes.forEach(node => {
    const nodeWithChildren = map.get(node.id)!;
    
    if (node.parent_id && map.has(node.parent_id)) {
      const parent = map.get(node.parent_id)!;
      if (!parent.children) parent.children = [];
      parent.children.push(nodeWithChildren);
    } else {
      roots.push(nodeWithChildren);
    }
  });

  return roots;
}

/**
 * Flatten cây thành mảng với thông tin level
 */
export function flattenTreeWithLevel(nodes: TableNode[], level = 0): TableNode[] {
  const result: TableNode[] = [];
  
  nodes.forEach(node => {
    result.push({ ...node, level });
    if (node.children) {
      result.push(...flattenTreeWithLevel(node.children, level + 1));
    }
  });
  
  return result;
}

/**
 * Tìm tất cả con của một node
 */
export function findAllChildren(nodeId: string | number, allNodes: TableNode[]): TableNode[] {
  const children = allNodes.filter(node => node.parent_id === nodeId);
  const allChildren = [...children];
  
  children.forEach(child => {
    allChildren.push(...findAllChildren(child.id, allNodes));
  });
  
  return allChildren;
}

/**
 * Tìm tất cả cha của một node
 */
export function findAllParents(nodeId: string | number, allNodes: TableNode[]): TableNode[] {
  const node = allNodes.find(n => n.id === nodeId);
  if (!node || node.parent_id === null) return [];
  
  const parent = allNodes.find(n => n.id === node.parent_id);
  if (!parent) return [];
  
  return [parent, ...findAllParents(parent.id, allNodes)];
}

/**
 * Tìm đường dẫn từ root đến node
 */
export function findPathToNode(nodeId: string | number, allNodes: TableNode[]): TableNode[] {
  const parents = findAllParents(nodeId, allNodes);
  const node = allNodes.find(n => n.id === nodeId);
  
  return [...parents.reverse(), ...(node ? [node] : [])];
}

/**
 * Kiểm tra xem một node có phải là con của node khác không
 */
export function isChildOf(childId: string | number, parentId: string | number, allNodes: TableNode[]): boolean {
  const children = findAllChildren(parentId, allNodes);
  return children.some(child => child.id === childId);
}

/**
 * Lấy tất cả root nodes (parent_id = null)
 */
export function getRootNodes(nodes: TableNode[]): TableNode[] {
  return nodes.filter(node => node.parent_id === null);
}

/**
 * Lấy tất cả leaf nodes (không có con)
 */
export function getLeafNodes(nodes: TableNode[]): TableNode[] {
  return nodes.filter(node => 
    !nodes.some(other => other.parent_id === node.id)
  );
}

/**
 * Sắp xếp nodes theo level và tên
 */
export function sortNodesByLevelAndName(nodes: TableNode[]): TableNode[] {
  const nodesWithLevel = calculateAllLevels(nodes);
  
  return nodesWithLevel.sort((a, b) => {
    // Sắp xếp theo level trước
    if (a.level !== b.level) {
      return (a.level || 0) - (b.level || 0);
    }
    
    // Nếu cùng level thì sắp xếp theo tên
    const nameA = a.name || a.id.toString();
    const nameB = b.name || b.id.toString();
    return nameA.localeCompare(nameB);
  });
}

/**
 * Validate cấu trúc cây (không có cycle)
 */
export function validateTreeStructure(nodes: TableNode[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Kiểm tra cycle
  nodes.forEach(node => {
    const path = findPathToNode(node.id, nodes);
    const visited = new Set();
    
    for (const pathNode of path) {
      if (visited.has(pathNode.id)) {
        errors.push(`Cycle detected involving node ${node.id}`);
        break;
      }
      visited.add(pathNode.id);
    }
  });
  
  // Kiểm tra parent_id tồn tại
  nodes.forEach(node => {
    if (node.parent_id !== null) {
      const parentExists = nodes.some(n => n.id === node.parent_id);
      if (!parentExists) {
        errors.push(`Parent with id ${node.parent_id} not found for node ${node.id}`);
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Tạo dữ liệu demo cho testing
 */
export function createDemoTableData(): TableNode[] {
  return [
    // Level 0
    { id: 1, parent_id: null, name: 'Root 1', type: 'root' },
    { id: 2, parent_id: null, name: 'Root 2', type: 'root' },
    
    // Level 1
    { id: 3, parent_id: 1, name: 'Child 1.1', type: 'child' },
    { id: 4, parent_id: 1, name: 'Child 1.2', type: 'child' },
    { id: 5, parent_id: 2, name: 'Child 2.1', type: 'child' },
    
    // Level 2
    { id: 6, parent_id: 3, name: 'Grandchild 1.1.1', type: 'grandchild' },
    { id: 7, parent_id: 3, name: 'Grandchild 1.1.2', type: 'grandchild' },
    { id: 8, parent_id: 4, name: 'Grandchild 1.2.1', type: 'grandchild' },
    { id: 9, parent_id: 5, name: 'Grandchild 2.1.1', type: 'grandchild' },
    
    // Level 3
    { id: 10, parent_id: 6, name: 'Great-grandchild 1.1.1.1', type: 'great-grandchild' },
    { id: 11, parent_id: 7, name: 'Great-grandchild 1.1.2.1', type: 'great-grandchild' }
  ];
}

/**
 * Format dữ liệu để hiển thị trong table với indentation
 */
export function formatTableDataForDisplay(nodes: TableNode[]): TableNode[] {
  const nodesWithLevel = calculateAllLevels(nodes);
  const sortedNodes = sortNodesByLevelAndName(nodesWithLevel);
  
  return sortedNodes.map(node => ({
    ...node,
    displayName: `${'  '.repeat(node.level || 0)}${node.name || node.id}`,
    indentLevel: node.level || 0
  }));
}

