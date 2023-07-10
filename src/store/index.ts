import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;