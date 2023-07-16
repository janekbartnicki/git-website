import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;