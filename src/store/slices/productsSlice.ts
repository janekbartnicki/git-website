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
export const { updateProducts } = productsSlice.actions;