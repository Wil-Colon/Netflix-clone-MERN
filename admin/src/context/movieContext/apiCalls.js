import {
    deleteMovieStart,
    getMoviesFailure,
    getMoviesStart,
    getMoviesSuccess,
    deleteMovieSuccess,
    deleteMovieFailure,
    createMovieStart,
    createMovieSuccess,
    createMovieFailure,
    updateMovieFailure,
    updateMovieStart,
    updateMovieSuccess,
} from './MovieActions';
import axios from 'axios';

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get(
            'https://clone-moviesite.onrender.com/api/movies',
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(getMoviesSuccess(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
};

//create movie
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post(
            'https://clone-moviesite.onrender.com/api/movies',
            movie,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
};

//delete movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete(
            'https://clone-moviesite.onrender.com/api/movies/' + id,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(deleteMovieSuccess(id));
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
};

//update movie
export const updateMovie = async (movieId, movieUpdated, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put(
            'https://clone-moviesite.onrender.com/api/movies/' + movieId,
            movieUpdated,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(updateMovieSuccess(res.data));
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};
