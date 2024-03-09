import { configureStore } from '@reduxjs/toolkit';
import products from './features/checkout/checkoutSlice';
import search from './features/history/historySlice';

export const store = () => {
    return configureStore({
        reducer: { products, search },
        middleware: getDefaultMiddleware => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production'
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']