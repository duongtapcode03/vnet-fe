 export interface Test {
    id: number;
    name: string;
    description: string;
    items: TestItem[];
}
export interface TestRequest {
    name: string;
    description: string;
}
export interface TestItem {
    id: number;
    name: string;
    category: string;
    price: number;
    createdAt: string;
    cateId: number;
    cateName: string;
}