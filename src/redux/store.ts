import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/api/userApi';
import authReducer from './slices/authSlice';
import { testApi } from '@/services/api/testApi';
import { productApi } from '@/services/api/productApi';
import { careerApi } from '@/services/api/careerApi';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer,
        [testApi.reducerPath]: testApi.reducer, 
        [productApi.reducerPath]: productApi.reducer,
        [careerApi.reducerPath]: careerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userApi.middleware,testApi.middleware,productApi.middleware,careerApi.middleware);
    }
});
export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;