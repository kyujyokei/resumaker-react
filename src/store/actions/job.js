import axios from 'axios';
import * as actionTypes from './actionTypes';

export const jobPostStart = () => {
    return {
        type: actionTypes.JOB_POST_START
    };
};

export const jobPostSuccess = () => {
    return {
        type: actionTypes.JOB_POST_SUCCESS
    };
};

export const jobPostFail = (error) => {
    return {
        type: actionTypes.JOB_POST_FAIL,
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

        let url = 'https://obscure-journey-65698.herokuapp.com/jobs';

        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                // console.log(response.headers['x-auth']);
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', response.headers['x-auth']);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data._id);
                dispatch(authSuccess(response.headers['x-auth'], response.data._id));
                dispatch(checkAuthTimeout());

            })
            .catch(err => {
                // console.log(err.response.data.errmsg);
                dispatch(authFail(err.response.data.errmsg));
            })
    }
}