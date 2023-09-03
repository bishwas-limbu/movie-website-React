import React from 'react';
import {createSlice} from '@reduxjs/toolkit';
import {MoviesInterface} from '../interface/globalInterface';



const initialState: MoviesInterface = {
    movies: [],
  //  originalMovies: [],
};
const  movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setGlobalMovies: (state,moviesData) => {
            state.movies = moviesData.payload;
           // state.originalMovies = moviesData.payload; 
        },
        // setFilterMovies: (state,moviesData) => {
        //     state.movies = moviesData.payload; 
        // },
        // setMovies: (state) =>{
        //     state.movies = state.originalMovies;
        // },
    },
});

//export const { setGlobalMovies,setFilterMovies, setMovies} = movieSlice.actions;
export const { setGlobalMovies} = movieSlice.actions;
export default movieSlice.reducer;


