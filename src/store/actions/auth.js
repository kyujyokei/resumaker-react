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
        Idtoken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
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
                console.log(response.headers);
                // dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}