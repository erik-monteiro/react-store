import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url).
        then(res => res.json()).
        catch(error =>  console.log(error));
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        resetCart: (state) => {
            state.cartItems = cartItems;
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            if (cartItem.amount == 1) {
                cartItem.amount = cartItem.amount;
            } else {
                cartItem.amount = cartItem.amount - 1;
            }
        },
        totalPrice: (state) => {
            let total = 0;
            let amount = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: {
        [getCartItems.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { clearCart, resetCart, removeItem, increase, decrease, totalPrice } = cartSlice.actions;
;

export default cartSlice.reducer;