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