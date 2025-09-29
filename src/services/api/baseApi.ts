import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const createBaseApi = (url: string) => {
    return fetchBaseQuery({
        baseUrl: url,
    });
}

export {createBaseApi};

export  default createBaseApi;