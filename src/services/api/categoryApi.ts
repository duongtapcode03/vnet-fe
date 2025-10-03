import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseApi } from "./baseApi";
import { 
    Category, 
    CategoryCreateRequest, 
    CategoryUpdateRequest, 
    ApiResponse, 
    PaginatedResponse 
} from "@/types";

// Request types matching backend
export interface SimpleTestRequest {
    categoryCode?: string | null;
    categoryName?: string | null;
    description?: string | null;
    editable?: number | null;
    parentId?: number | null;
    isDeleted?: number | null;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDescription?: string;
}

export interface SimpleTestCreateRequest {
    categoryCode: string;
    categoryName: string;
    description?: string;
    editable?: number;
    parentId?: number;
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: createBaseApi('http://192.168.0.103:8090/api/simple-tests'),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        // Search with pagination
        getCategories: builder.mutation<ApiResponse<PaginatedResponse<Category>>, SimpleTestRequest>({
            query: (params) => ({
                url: '/searchPaging',
                method: 'POST',
                body: {
                    categoryCode: params.categoryCode || null,
                    categoryName: params.categoryName || null,
                    description: params.description || null,
                    editable: params.editable || null,
                    parentId: params.parentId || null,
                    isDeleted: params.isDeleted || null,
                    page: params.page || 0,
                    size: params.size || 20,
                    sortBy: params.sortBy || "id",
                    sortDescription: params.sortDescription || "asc"
                },
            }),
            providesTags: ['Category'],
        }),
        // Get by ID
        getCategoryById: builder.query<ApiResponse<Category>, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
        // Create new category
        createCategory: builder.mutation<ApiResponse<Category>, SimpleTestCreateRequest>({
            query: (category) => ({
                url: '',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
        // Update category
        updateCategory: builder.mutation<ApiResponse<Category>, {id: number, data: SimpleTestCreateRequest}>({
            query: ({id, data}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, {id}) => [
                { type: 'Category', id },
                'Category'
            ],
        }),
        // Delete category
        deleteCategory: builder.mutation<ApiResponse<string>, number>({                                                                                                                                  
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Category', id },
                'Category'                                                                                                                                                                                                                                                  
            ],
        }),
        // Export categories
        exportCategories: builder.mutation<Blob, SimpleTestCreateRequest>({
            query: (request) => ({
                url: '/export',
                method: 'POST',
                body: request,
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const { 
    useGetCategoriesMutation, 
    useGetCategoryByIdQuery,
    useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation,
    useExportCategoriesMutation
} = categoryApi;
