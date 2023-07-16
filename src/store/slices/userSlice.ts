import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState: Partial<User> = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return {...action.payload}
        },
        unsetUser() {
            return initialState;
        }
    }
});

export default userSlice;
export const {setUser, unsetUser} = userSlice.actions;