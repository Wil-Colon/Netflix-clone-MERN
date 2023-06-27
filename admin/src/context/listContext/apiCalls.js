import {
    deleteListFailure,
    deleteListSuccess,
    deleteListStart,
    getListsStart,
    getListsSuccess,
    getListsFailure,
    createListStart,
    createListSuccess,
    createListFailure,
    updateListStart,
    updateListSuccess,
    updateListFailure,
} from './ListActions';
import axios from 'axios';

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get(
            'https://clone-moviesite.onrender.com/api/lists',
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(getListsSuccess(res.data));
    } catch (err) {
        dispatch(getListsFailure());
    }
};

//create List
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post(
            'https://clone-moviesite.onrender.com/api/lists',
            list,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(createListSuccess(res.data));
    } catch (err) {
        dispatch(createListFailure());
    }
};

//delete list
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete(
            'https://clone-moviesite.onrender.com/api/lists/' + id,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};

//update movie
export const updateList = async (listId, listUpdated, dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put(
            'https://clone-moviesite.onrender.com/lists/' + listId,
            listUpdated,
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            }
        );
        dispatch(updateListSuccess(res.data));
    } catch (err) {
        dispatch(updateListFailure());
    }
};
