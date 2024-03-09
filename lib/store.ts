import { configureStore } from '@reduxjs/toolkit';
// import monster from './features/monster/monsterSlice';
// import states from './features/states/stateSlice';
import products from './features/checkout/checkoutSlice';

export const store = () => {
    return configureStore({
        reducer: { products },
        middleware: getDefaultMiddleware => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production'
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']