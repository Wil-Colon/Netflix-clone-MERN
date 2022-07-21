import axios from 'axios';
import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
} from './AuthAction';

export const login = async (user, dispatch) => {
    dispatch(loginStart());

    try {
        const res = await axios.post('/api/auth/login', user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('/api/auth/register', user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};
