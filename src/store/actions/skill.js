import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const initSkills = () => {
    return dispatch => {
        axios.get('/skills')
            .then( response => {
                dispatch(setSkills(response.data))
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