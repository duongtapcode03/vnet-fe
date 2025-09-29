import { createApi } from '@reduxjs/toolkit/query/react';
import {createBaseApi} from './baseApi';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: createBaseApi('http://192.168.150.45:8090/api/democrud-cate'),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<User, CreateUserRequest>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        
        updateUser: builder.mutation<User, UpdateUserRequest>({
            query: ({id, ...rest}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Users'],
        }),
        
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        
    }),
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;