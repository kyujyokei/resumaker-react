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

export const schoolStateReset = () => {
    return {
        type: actionTypes.SCHOOL_STATE_RESET
    };
};

export const postSchool = (state, isPatch, id) => {
    return dispatch => {
        dispatch(schoolPostStart());
        console.log('isPatch:, ', id);

        const school = {
            schoolName: state.info.schoolName.value,
            startedDate: state.info.startedDate.value,
            endDate: state.info.endDate.value,
            gpa: state.info.gpa.value,
            major: state.info.major.value,
            location: state.info.location.value,
            hasGraduated: true // TODO: modify this
        };
        
        console.log('school info: ', school);

        //console.log('SCHOOL: ',school);
        let url = 'https://obscure-journey-65698.herokuapp.com/schools';
        if ( !isPatch ) {
            // console.log('post');
            axios.post(url, school, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);

                dispatch(schoolPostSuccess(response));

            })
            .catch(err => {
                console.log(err);
                dispatch(schoolPostFail(err.response.status, err.response.data.message));
            });
        } else {
            // patch mode
            // console.log('patch');
            axios.patch(url + '/' + id, school, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);

                dispatch(schoolPostSuccess(response));

            })
            .catch(err => {
                console.log(err);
                dispatch(schoolPostFail(err.response.status, err.response.data.message));
            });
        }




    }
}


export const getSchoolById = (id) => {
    return dispatch => {
        dispatch(schoolGetByIdStart());
        axios.get( 'https://obscure-journey-65698.herokuapp.com/schools/' + id, { headers: { "x-auth":  localStorage.getItem("token")}} )
                    .then( response => {
                        // console.log("Get School by ID Res: ",response);
                        dispatch(schoolGetByIdSuccess(response))
                    }).catch(err => {
                        console.log(err);
                        dispatch(schoolGetByIdFail(err));
                    });
    }
    
};

export const schoolGetByIdStart = () => {
    return {
        type: actionTypes.SCHOOL_GID_START
    };
};

export const schoolGetByIdSuccess = (response) => {
    return {
        type: actionTypes.SCHOOL_GID_SUCCESS,
        status: response.status,
        school: response.data.school[0] // only loads 1 school so it's gauranteed to be the first one
    };
};

export const schoolGetByIdFail = (response) => {
    return {
        type: actionTypes.SCHOOL_GID_FAIL,
        error: response.err,
        status: response.status
    };
};

export const enableSchoolPatch = () => {
    return {
        type: actionTypes.SCHOOL_EN_PATCH,
        isPatch: true
    };
};

