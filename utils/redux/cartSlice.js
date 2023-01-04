import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: ''
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        SET_STATE: (state, action) => {
            switch (action.payload.type) {
                case 'cartItems':
                    state.cart.cartItems = action.payload.data
                    break;
                case 'shippingAdd':
                    state.cart.shippingAddress = action.payload.data
                    break;
                case 'payment':
                    state.cart.paymentMethod = action.payload.data
                    break;
                default:
                    break;
            }
            !action.payload.type === 'cartItems' && axios.post(`http://localhost:3000/api/cart`, {
                data: state.cart
            })

        },
        ADD_ITEM: (state, action) => {
            const index = state.cart.cartItems.findIndex((item, index) => item.slug === action.payload.product.slug)
            index >= 0 ? state.cart.cartItems[index].quantity = state.cart.cartItems[index].quantity + 1 : state.cart.cartItems.push({ ...action.payload.product, quantity: 1 })
            axios.post(`http://localhost:3000/api/cart`, {
                data: { cartItems: [...state.cart.cartItems] }
            })
        },
        REMOVE_ITEM: (state, action) => {
            const index = state.cart.cartItems.findIndex((item, index) => item.slug === action.payload.slug)
            state.cart.cartItems.splice(index, 1)
            axios.post(`http://localhost:3000/api/cart`, {
                data: { cartItems: [...state.cart.cartItems] }
            })
        },
        CHANGE_QUANTITY: (state, action) => {
            state.cart.cartItems[action.payload.index].quantity = action.payload.value
            axios.post(`http://localhost:3000/api/cart`, {
                data: { cartItems: [...state.cart.cartItems] }
            })
        },
        CLEAR_CART: (state, action) => {
            state.cart.cartItems = []
            axios.post(`http://localhost:3000/api/cart`, {
                data: { cartItems: [] }
            })
        }
    },
    extraReducers: {
    },
})


export const { ADD_ITEM, REMOVE_ITEM, CHANGE_QUANTITY, SET_STATE, CLEAR_CART } = cartSlice.actions;

export default cartSlice.reducer;

