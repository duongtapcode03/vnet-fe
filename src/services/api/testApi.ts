import { createApi } from "@reduxjs/toolkit/query/react";
import {createBaseApi} from "./baseApi";
import { Test, TestRequest } from "@/types/test";

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: createBaseApi('http://192.168.150.45:8090/api/democrud-cate'),
    tagTypes: ['Test'],
    endpoints: (builder) => ({
        getTest: builder.query<Test[], void>({
            query: () => '',
            providesTags: ['Test'],
        }),
        createTest: builder.mutation<Test, TestRequest>({
            query: (test) => ({
                url: '',
                method: 'POST',
                body: test,
            }),
            invalidatesTags: ['Test'],
        }),
        updateTest: builder.mutation<Test, TestRequest & {id: number}>({
            query: ({id, ...test}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: test,
            }),
            invalidatesTags: ['Test'],
        }),
        deleteTest: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Test'],
        }),
    }),
   
})

export const { useGetTestQuery, useCreateTestMutation, useUpdateTestMutation, useDeleteTestMutation } = testApi;
