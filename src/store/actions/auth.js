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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 36000000); // auto authorized time period, logs out afterwards
    };
};

export const auth = (authInfo, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        console.log("isSignup: ", isSignup, authInfo);
        const authData = {
            ...authInfo
        };

        let url = 'https://obscure-journey-65698.herokuapp.com/users';
        if (!isSignup) {
            url = 'https://obscure-journey-65698.herokuapp.com/users/login';
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
                localStorage.setItem('token', response.headers['x-auth']);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data._id);
                dispatch(authSuccess(response.headers['x-auth'], response.data._id));
                dispatch(checkAuthTimeout());

            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
                // dispatch(authFail(err.response.data.errmsg));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}