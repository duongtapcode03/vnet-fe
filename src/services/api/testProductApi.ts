import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseApi } from "./baseApi";

// Types based on backend DTOs
export interface SimpleTestProductResponse {
    id: number;
    productCode: string;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    categoryName: string;
    createdAt: string;
}

export interface SimpleTestProductCreateRequest {
    productCode: string;
    productName: string;
    description?: string;
    price: number;
    quantity: number;
    categoryId: number;
}

export interface ApiResponse<T> {
    operator: string;
    code: string;
    message: string;
    data: T;
}

export interface PageResponse<T> {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export const testProductApi = createApi({
    reducerPath: 'testProductApi',
    baseQuery: createBaseApi('/api/simple-tests/prod'),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        // GET /api/simple-tests/prod/listAllproduct
        getAllProducts: builder.query<ApiResponse<PageResponse<SimpleTestProductResponse>>, {
            page?: number;
            size?: number;
            sortBy?: string;
            sortDirection?: string;
        }>({
            query: ({page = 0, size = 10, sortBy = 'id', sortDirection = 'desc'}) => 
                `listAllproduct?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
            providesTags: ['Product'],
        }),
        
        // GET /api/simple-tests/prod/listproduct/{id}
        getProductsByCategory: builder.query<ApiResponse<PageResponse<SimpleTestProductResponse>>, {
            categoryId: number;
            page?: number;
            size?: number;
            sortBy?: string;
            sortDirection?: string;
        }>({
            query: ({categoryId, page = 0, size = 10, sortBy = 'id', sortDirection = 'desc'}) => 
                `listproduct/${categoryId}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
            providesTags: ['Product'],
        }),
        
        // POST /api/simple-tests/prod
        createProduct: builder.mutation<ApiResponse<SimpleTestProductResponse>, SimpleTestProductCreateRequest>({
            query: (product) => ({
                url: '',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        
        // PUT /api/simple-tests/prod/{id}
        updateProduct: builder.mutation<ApiResponse<SimpleTestProductResponse>, {
            id: number;
            product: SimpleTestProductCreateRequest;
        }>({
            query: ({id, product}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        
        // DELETE /api/simple-tests/prod/{id}
        deleteProduct: builder.mutation<ApiResponse<string>, {id: number}>({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { 
    useGetAllProductsQuery,
    useGetProductsByCategoryQuery,
    useCreateProductMutation, 
    useUpdateProductMutation, 
    useDeleteProductMutation 
} = testProductApi;
