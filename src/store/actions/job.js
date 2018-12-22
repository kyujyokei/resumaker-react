import axios from 'axios';
import * as actionTypes from './actionTypes';

export const jobPostStart = () => {
    return {
        type: actionTypes.JOB_POST_START
    };
};

export const jobPostSuccess = (status) => {
    return {
        type: actionTypes.JOB_POST_SUCCESS,
        status: status
    };
};

export const jobPostFail = (status, error) => {
    return {
        type: actionTypes.JOB_POST_FAIL,
        error: error,
        status: status
    };
};

export const jobPostReset = () => {
    return {
        type: actionTypes.JOB_POST_RESET
    };
};

export const postJob = (state) => {
    return dispatch => {
        dispatch(jobPostStart());
        // console.log(state);

        var updatedDescriptions = [];

        for (var d in state.descriptions) {
            var skills = [];
            if (state.descriptions[d].skills){ // this allows statements without skill tags to pass
                for (var s in state.descriptions[d].skills[0]){
                    skills.push({
                        skillName: state.descriptions[d].skills[0][s].label,
                        skillId: state.descriptions[d].skills[0][s].value
                    });
                }
                updatedDescriptions.push({
                    description: state.descriptions[d].value,
                    skills: skills
                });
            }
            
        }

        //console.log("UPDATED D: ", updatedDescriptions);

        const job = {
            position: state.info.position.value,
            companyName: state.info.companyName.value,
            startedDate: state.info.startedDate.value,
            endDate: state.info.endDate.value,
            descriptions: updatedDescriptions
        };


        //console.log('JOB: ',job);
        let url = 'https://obscure-journey-65698.herokuapp.com/jobs';

        axios.post(url, job, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                dispatch(jobPostSuccess(response));

            })
            .catch(err => {
                console.log(err.response);
                dispatch(jobPostFail(err.response.status, err.response.data.message));
            })



    };
};

export const getJobById = (id) => {
    return dispatch => {
        dispatch(jobGetByIdStart());
        axios.get( 'https://obscure-journey-65698.herokuapp.com/jobs/' + id, { headers: { "x-auth":  localStorage.getItem("token")}} )
                    .then( response => {
                        // console.log("Get Job by ID Res: ",response);
                        dispatch(jobGetByIdSuccess(response))
                    }).catch(err => {
                        console.log(err);
                        dispatch(jobGetByIdFail(err));
                    });
    }
    
};

export const jobGetByIdStart = () => {
    return {
        type: actionTypes.JOB_GID_START
    };
};

export const jobGetByIdSuccess = (response) => {
    return {
        type: actionTypes.JOB_GID_SUCCESS,
        status: response.status,
        job: response.data.job[0] // only loads 1 job so it's gauranteed to be the first one
    };
};

export const jobGetByIdFail = (response) => {
    return {
        type: actionTypes.JOB_GID_FAIL,
        error: response.err,
        status: response.status
    };
};

export const enablePatch = (isPatch) => {
    return {
        type: actionTypes.JOB_EN_PATCH,
        isPatch: true
    };
};