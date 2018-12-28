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

export const jobStateReset = () => {
    return {
        type: actionTypes.JOB_STATE_RESET
    };
};

export const postJob = (state, isPatch, id) => {
    return dispatch => {
        dispatch(jobPostStart());
        // console.log(state);

        var updatedDescriptions = [];
        // console.log('state.descriptions: ', state.descriptions);
        for (var d in state.descriptions) {
            // console.log('D: ', state.descriptions[d]);
            var skills = [];
            if (state.descriptions[d].skills){ // this allows statements without skill tags to pass
                for (var s in state.descriptions[d].skills){
                    skills.push({
                        skillName: state.descriptions[d].skills[s].label,
                        skillId: state.descriptions[d].skills[s].value
                    });
                }
                updatedDescriptions.push({
                    description: state.descriptions[d].value,
                    skills: skills
                });
            }
            
        }

        let job = {
            position: state.info.position.value,
            companyName: state.info.companyName.value,
            startedDate: state.info.startedDate.value,
            endDate: state.info.endDate.value,
            descriptions: updatedDescriptions
        };


        // console.log('JOB: ',job);
        let url = 'https://obscure-journey-65698.herokuapp.com/jobs';


        if ( !isPatch ) {
            // console.log("POST JOB:", job);
            axios.post(url, job, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                dispatch(jobPostSuccess(response));

            })
            .catch(err => {
                console.log(err.response);
                dispatch(jobPostFail(err.response.status, err.response.data.message));
            })
        } else {
            // console.log("PATCH LAUNCHED IN ACTIONS")
            // console.log("PATCH JOB:", job);
            url = url + '/' + id
            axios.patch(url, job, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                dispatch(jobPostSuccess(response));

            })
            .catch(err => {
                console.log(err.response);
                dispatch(jobPostFail(err.response.status, err.response.data.message));
            })
        }





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

export const enablePatch = () => {
    return {
        type: actionTypes.JOB_EN_PATCH,
        isPatch: true
    };
};

// TODO: make sure patch methods are all merged with post, and clean up exccess patch methods in all files 

// export const patchJob = ( state ) => {
//     return dispatch => {
//         dispatch(jobGetByIdStart());
//         axios.patch( 'https://obscure-journey-65698.herokuapp.com/jobs/' + id, { headers: { "x-auth":  localStorage.getItem("token")}} )
//                     .then( response => {
//                         // console.log("Get Job by ID Res: ",response);
//                         // dispatch(jobGetByIdSuccess(response))
//                     }).catch(err => {
//                         console.log(err);
//                         // dispatch(jobGetByIdFail(err));
//                     });
//     }
    
// };

// export const jobPatchStart = () => {
//     return {
//         type: actionTypes.JOB_PATCH_START
//     };
// };

// export const jobPatchSuccess = (response) => {
//     return {
//         type: actionTypes.JOB_PATCH_SUCCESS,
//         status: response.status,
//         // job: response.data.job[0] // only loads 1 job so it's gauranteed to be the first one
//     };
// };

// export const jobPatchFail = (response) => {
//     return {
//         type: actionTypes.JOB_PATCH_FAIL,
//         error: response.err,
//         status: response.status
//     };
// };