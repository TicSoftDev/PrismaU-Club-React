import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import credencialSlice from "./credencialSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        credenciales: credencialSlice,
    }
})