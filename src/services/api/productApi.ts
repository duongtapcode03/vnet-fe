import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseApi } from "./baseApi";
import { TestItem } from "@/types/test";
import { UpdateProductRequest } from "@/types/product";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: createBaseApi('http://192.168.150.45:8090/api/democrud'),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<any, {page: number, pageSize: number}>({
            query: ({page, pageSize}) => `?page=${page}&size=${pageSize}`,
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<any, UpdateProductRequest>({
            query: (product) => ({
                url: '',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<any, UpdateProductRequest & {id: number}>({
            query: ({id, ...product}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<any, {id: string}>({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;
