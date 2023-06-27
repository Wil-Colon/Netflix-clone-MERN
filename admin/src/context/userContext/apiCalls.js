import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from './UserActions';
import axios from 'axios';

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(
            'https://clone-moviesite.onrender.com/api/users',
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

//delete user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete(
            'https://clone-moviesite.onrender.com/api/users/' + id,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

//Update user
export const updateUser = async (_id, formData, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put(
            'https://clone-moviesite.onrender.com/api/users/' + _id,
            formData,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};
