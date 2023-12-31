import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, fetchProducts } from "../../utils";

export const fetchProductsData = createAsyncThunk(
    'products/fetchProductsData',
    fetchProducts
)

interface ProductsState {
    data: Product[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    data: [],
    loading: 'idle'
} as ProductsState;

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProducts(state, action: PayloadAction<Product[]>) {
            state.data = action.payload;
        },
        removeLocalProduct({data}, {payload}: PayloadAction<{id: number, size: number, quantity: number}>) {
            const product = payload.id ? data.find(product => product.id === Number(payload.id)) : null;

            if(product) {
                product.inStock[payload.size] = (product.inStock[payload.size] > 0) ? product.inStock[payload.size] - payload.quantity : 0;
            }

            data = data.map(item => {
                if(item.id === payload.id && product){
                    return product;
                } else {
                    return item;
                }
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = 'succeeded';
            })
            .addCase(fetchProductsData.pending, state => {
                state.loading = 'pending';
            })
            .addCase(fetchProductsData.rejected, state => {
                state.loading = 'failed';
            })
    }
})

export default productsSlice;
export const { updateProducts, removeLocalProduct } = productsSlice.actions;