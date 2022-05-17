import {
    deleteListFailure,
    deleteListSuccess,
    deleteListStart,
    getListsStart,
    getListsSuccess,
    getListsFailure,
} from './ListActions';
import axios from 'axios';

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get('/lists', {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')).accessToken,
            },
        });
        dispatch(getListsSuccess(res.data));
    } catch (err) {
        dispatch(getListsFailure());
    }
};

// //create movie
// export const createMovie = async (movie, dispatch) => {
//     dispatch(createMovieStart());
//     try {
//         const res = await axios.post('/movies', movie, {
//             headers: {
//                 token:
//                     'Bearer ' +
//                     JSON.parse(localStorage.getItem('user')).accessToken,
//             },
//         });
//         dispatch(createMovieSuccess(res.data));
//     } catch (err) {
//         dispatch(createMovieFailure());
//     }
// };

//delete list
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete('/lists/' + id, {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')).accessToken,
            },
        });
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};

// //update movie
// export const updateMovie = async (movieId, movieUpdated, dispatch) => {
//     dispatch(updateMovieStart());
//     try {
//         const res = await axios.put('/movies/' + movieId, movieUpdated, {
//             headers: {
//                 token:
//                     'Bearer ' +
//                     JSON.parse(localStorage.getItem('user')).accessToken,
//             },
//         });
//         dispatch(updateMovieSuccess(res.data));
//     } catch (err) {
//         dispatch(updateMovieFailure());
//     }
// };
