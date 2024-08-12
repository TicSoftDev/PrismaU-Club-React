import { configureStore } from "@reduxjs/toolkit";
import credencialSlice from "./credencialSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        credenciales: credencialSlice,
    }
})