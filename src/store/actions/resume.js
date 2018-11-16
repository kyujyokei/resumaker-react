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

export const resPostFail = (status, error) => {
    return {
        type: actionTypes.RES_POST_FAIL,
        error: error,
        status: status
    };
};

export const resPostReset = () => {
    return {
        type: actionTypes.RES_POST_RESET
    };
};


export const postRes = (state) => {
    return dispatch => {
        dispatch(resPostStart());
        
        console.log("STATE: ",state);

        const jobPostUrl = {
            url: state
        };

        console.log(jobPostUrl);


        //console.log('RES: ',res);
        let url = 'https://obscure-journey-65698.herokuapp.com/resumes';

        axios.post(url, jobPostUrl, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {

                dispatch(resPostSuccess(response));

            })
            .catch(err => {
                console.log(err.response);
                dispatch(resPostFail(err.response.status, err.response.data.message));
            })



    }
}