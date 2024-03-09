import { createSlice  } from "@reduxjs/toolkit";

type Product = {
    _id: string;
    name: string;
    price: number;
};

type CartStorage = {
    id: string,
    amount: number
}

type InityalState = {
    cartProducts: Product[],
    cartStorage: CartStorage[],
}

const initialState:InityalState = {
    cartProducts: [],
    cartStorage: [],
};
  
const statesSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCartProducts: (state, action) => {
            state.cartProducts = action.payload;
        },
        setCartStorage: (state, action) => {
            state.cartStorage = action.payload;
        }
    },
})

const {actions, reducer} = statesSlice;

export default reducer

export const {
    setCartProducts,
    setCartStorage
} = actions;