import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const initSkills = () => {
    return dispatch => {
        axios.get('/skills')
            .then( response => {

                var modifiedSkills = [];

                Object.keys(response.data.skills).forEach(function(key) {

                    modifiedSkills.push({
                        label:response.data.skills[key].name,
                        value:response.data.skills[key]._id
                    })
                });

                dispatch(setSkills(modifiedSkills))
            })
            .catch( error => {
                dispatch(fetchSkillsFailed());
            });
    };
};

export const setSkills = (skills) => {
    return {
        type: actionTypes.SET_SKILLS,
        skills: skills
    };
};

export const fetchSkillsFailed = () => {
    return {
        type: actionTypes.FETCH_SKILLS_FAILED
    }
};

export const postSkill = ( state, action ) => {
    return dispatch => {
        dispatch(skillPostStart());
        const skill = {
            name: state.skillName.value
        };

        console.log(skill);

        let url = 'https://obscure-journey-65698.herokuapp.com/skills';

        axios.post(url, skill, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);

            })
            .catch(err => {
                console.log(err);

            })
    }
}

export const skillPostStart = () => {
    return {
        type: actionTypes.SKILL_POST_START
    };
};

export const skillPostSuccess = (status) => {
    return {
        type: actionTypes.SKILL_POST_SUCCESS,
        status: status
    };
};

export const skillPostFail = (status, error) => {
    return {
        type: actionTypes.SKILL_POST_FAIL,
        error: error,
        status: status
    };
};