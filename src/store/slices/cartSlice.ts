import { createSlice } from "@reduxjs/toolkit";

interface CartProduct {
    id: number;
    name: string;
    size: number;
    price: number;
    quantity: number;
}

const initialState: CartProduct[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action: {type: string; payload: CartProduct}): void {
            const {id, size} = action.payload;
            const foundProduct = state.find(product => product.id === id && product.size === size);

            if(foundProduct) {
                foundProduct.quantity += 1;
            } else {
                state.push({...action.payload, quantity: action.payload.quantity});
            }
        },
        removeProduct(state, action: {type: string, payload: {id: number, size: number}}): void {
            const {id, size} = action.payload;
            const index = state.findIndex(product => product.id === id && product.size === size);

            if(index !== -1) {
                const product = state[index];

                if(product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    state.splice(index, 1);
                }
            }

        },
        clearCart() {
            return initialState;
        }
    }
});

export default cartSlice;
export const { addProduct, removeProduct, clearCart } = cartSlice.actions;