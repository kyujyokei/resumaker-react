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

export const postJob = (state) => {
    return dispatch => {
        dispatch(jobPostStart());
        // console.log('Job Post started');
        console.log(state);

        var updatedDescriptions = [];

        for (var d in state.descriptions) {
            // console.log('D: ',state.descriptions[d])
            var skills = []
            for (var s in state.descriptions[d].skills[0]){
                // console.log('S: ',state.descriptions[d].skills[0])
                // console.log('S[s]: ',state.descriptions[d].skills[0][s])
                skills.push({
                    skillName: state.descriptions[d].skills[0][s].label,
                    skillId: state.descriptions[d].skills[0][s].value
                });
                // console.log('[S]: ',skills);
            }
            updatedDescriptions.push({
                description: state.descriptions[d].value,
                skills: skills
            });
            // console.log('[D]: ',updatedDescriptions);
        }

        console.log("UPDATED D: ", updatedDescriptions);

        const job = {
            position: state.info.position.value,
            companyName: state.info.companyName.value,
            startedDate: state.info.startedDate.value,
            endDate: state.info.endDate.value,
            descriptions: updatedDescriptions
        };


        console.log('JOB: ',job);
        let url = 'https://obscure-journey-65698.herokuapp.com/jobs';

        axios.post(url, job, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);

                dispatch(jobPostSuccess());

            })
            .catch(err => {
                console.log(err.response);
                dispatch(jobPostFail(err.response.data.errmsg));
            })



    }
}