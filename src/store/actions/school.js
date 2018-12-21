import axios from 'axios';
import * as actionTypes from './actionTypes';

export const schoolPostStart = () => {
    return {
        type: actionTypes.SCHOOL_POST_START
    };
};

export const schoolPostSuccess = (status) => {
    return {
        type: actionTypes.SCHOOL_POST_SUCCESS,
        status: status
    };
};

export const schoolPostFail = (status, error) => {
    return {
        type: actionTypes.SCHOOL_POST_FAIL,
        error: error,
        status: status
    };
};

export const schoolPostReset = () => {
    return {
        type: actionTypes.SCHOOL_POST_RESET
    };
};


export const postSchool = (state) => {
    return dispatch => {
        dispatch(schoolPostStart());


        const school = {
            schoolName: state.info.schoolName.value,
            startedDate: state.info.startedDate.value,
            endDate: state.info.endDate.value,
            gpa: state.info.gpa.value,
            major: state.info.major.value,
            hasGraduated: true // TODO: modify this
        };


        //console.log('SCHOOL: ',school);
        let url = 'https://obscure-journey-65698.herokuapp.com/schools';

        axios.post(url, school, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);

                dispatch(schoolPostSuccess(response.status));

            })
            .catch(err => {
                console.log(err.response);
                dispatch(schoolPostFail(err.response.status, err.response.data.message));
            })



    }
}