import axios from 'axios';
import * as actionTypes from './actionTypes';


export const initProfile = () => {
    return dispatch => {
        let url = 'https://obscure-journey-65698.herokuapp.com/users/me'
        axios.get(url, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then( response => {
                console.log("Get Profile: ", response.data)
                dispatch(setProfile(response.data));
            })
            .catch( error => {
                dispatch(fetchProfileFailed());
            });
    };
};

export const setProfile = (profile) => {
    return {
        type: actionTypes.SET_PRO,
        profile: profile
    }
};

export const fetchProfileFailed = () => {
    return {
        type: actionTypes.FETCH_PRO_FAILED
    }
}

export const proPatchStart = () => {
    return {
        type: actionTypes.PRO_PATCH_START
    };
};
