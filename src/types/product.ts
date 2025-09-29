    export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    createdAt: number;
    cateId: number;
    cateName: string;
}

export interface CreateProductRequest {
    name: string;
    category: string;
    price: number;
    cateId: number;
}

export interface UpdateProductRequest {
    name?: string;
    category?: string;
    price?: number;
    cateId?: number;
}

export interface PaginationParams {
    page: number;
    pageSize: number;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}
