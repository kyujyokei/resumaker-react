import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../shared/utility';


const initialState = {
    skills: [],
    error: false,
    response: null,
    status: null
}

const setSkills = ( state, action ) => {
    return updateObject( state, {
        skills: action.skills,
        error: false 
    });
}

const fetchSkillsFailed = ( state, action ) => {
    return updateObject( state, { error: true } );
}


export const skillPostStart = (state, action) => {
    return updateObject( state, {
        type: actionTypes.SKILL_POST_START,
        });
};

export const skillPostSuccess = (state, action) => {
    return updateObject( state, {
        type: actionTypes.SKILL_POST_SUCCESS,
        status: action.status.status,
        response: action.status.data
        });
};

export const skillPostFail = (state, error) => {
    return updateObject( state, {
        type: actionTypes.SKILL_POST_FAIL,
        error: error.status.response.data,
        status: error.status.response.status
        });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_SKILLS: return setSkills( state, action );
        case actionTypes.FETCH_SKILLS_FAILED: return fetchSkillsFailed( state, action );
        case actionTypes.SKILL_POST_START: return skillPostStart( state, action );
        case actionTypes.SKILL_POST_SUCCESS: return skillPostSuccess( state, action);
        case actionTypes.SKILL_POST_FAIL: return skillPostFail( state, action );
        default: return state;
    }
};


export default reducer;