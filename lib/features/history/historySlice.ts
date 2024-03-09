import { createSlice  } from "@reduxjs/toolkit";

type InityalState = {
    findOrderParams: string[]
}

const initialState:InityalState = {
    findOrderParams: [],
};
  
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setOrderParams: (state, action) => {
            state.findOrderParams = action.payload;
        },
    },
})

const {actions, reducer} = searchSlice;

export default reducer

export const {
    setOrderParams
} = actions;