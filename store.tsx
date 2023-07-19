import {configureStore} from '@reduxjs/toolkit'
import MovieReducer from './slice/sliceMovie'
import AuthReducer from './slice/sliceAuth'

const store = configureStore({
    reducer: {
        movieList: MovieReducer,
        authJWT : AuthReducer,
    },

});
export default store;