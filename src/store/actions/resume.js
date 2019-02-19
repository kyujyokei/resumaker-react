import axios from 'axios';
import * as actionTypes from './actionTypes';

export const resPostStart = () => {
    return {
        type: actionTypes.RES_POST_START
    };
};

export const resPostSuccess = (response) => {

    return {
        type: actionTypes.RES_POST_SUCCESS,
        status: response.status,
        data: response.data
    };
};

export const resPostFail = (error) => {
    return {
        type: actionTypes.RES_POST_FAIL,
        error: error
    };
};

export const resPostReset = () => {
    return {
        type: actionTypes.RES_POST_RESET
    };
};


export const postRes = (state, isText) => {
    return dispatch => {
        dispatch(resPostStart());
        
        console.log("STATE: ",state);

        let jobPost = {
            url: state
        };

        console.log("Job post:", jobPost);


        //console.log('RES: ',res);
        let url = 'https://obscure-journey-65698.herokuapp.com/resumes';
        if (isText) {
            jobPost = {
                text: state
            };
            url = url + '/text';
        } 

        axios.post(url, jobPost, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log("R:: " , response);
                dispatch(resPostSuccess(response));

            })
            .catch(err => {
                console.log("ERR: ",err);
                let error = 'Something went wrong, please check if the URL is valid or use the plain text mode.';
                dispatch(resPostFail(error));
            })



    }
}