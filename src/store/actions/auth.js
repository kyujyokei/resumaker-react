import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 36000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };

        let url = 'https://obscure-journey-65698.herokuapp.com/users';
        if (!isSignup) {
            url = 'https://obscure-journey-65698.herokuapp.com/users/login';
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                console.log(response.headers['x-auth']);
                dispatch(authSuccess(response.headers['x-auth'], response.data._id));
                dispatch(checkAuthTimeout());

            })
            .catch(err => {
                console.log(err.response.data.errmsg);
                dispatch(authFail(err.response.data.errmsg));
            })
    }
}