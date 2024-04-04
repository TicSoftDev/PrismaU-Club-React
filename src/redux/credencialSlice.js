import { crearStorage, removerStorage, usarStorage } from '../utilities/localstorage/localstorage';
import { createSlice } from '@reduxjs/toolkit';

const key = "credenciales";
const localStorage = usarStorage(key);

const userEmpty = {};

export const credencialSlice = createSlice({
    name: 'credenciales',
    initialState: localStorage ? localStorage : userEmpty,
    reducers: {
        createAcceso: (state, action) => {
            crearStorage(key, action.payload)
            return action.payload
        },
        updateAcceso: (state, action) => {
            state.clave = action.payload
        },
        resetAcceso: () => {
            removerStorage(key);
            return userEmpty
        }
    },
});

export const { createAcceso, resetAcceso, updateAcceso } = credencialSlice.actions;
export default credencialSlice.reducer;

