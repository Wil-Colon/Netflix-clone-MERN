import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthAction';

export const login = async (user, dispatch) => {
    dispatch(loginStart());

    try {
        const res = await axios.post(
            'https://netflix-mern.onrender.com/api/auth/login',
            user
        );
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
