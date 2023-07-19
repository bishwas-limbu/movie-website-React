import React from 'react';
import {createSlice} from '@reduxjs/toolkit';
import {AuthInterface} from '../interface/globalInterface';



const initialState: AuthInterface = {
    isLoggin: false,
    jwt: ""
};
const  authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setGlobalAuth: (state,authToken) => {
            state.isLoggin = true;
            state.jwt = authToken.payload;
        },
    },
});

export const { setGlobalAuth } = authSlice.actions;
export default authSlice.reducer;


