import * as actionTypes from '../actionTypes';
import { updateObject } from '../../utility';


const initialState = {
    skills: null,
    error: false
}

const setSkills = ( state, action ) => {
    return updateObject( state, {
        skills: action.skills,
        error: false // this part should fetch new skills loaded from server
    })
}

const fetchSkillsFailed = ( state, action ) => {
    return updateObject( state, { error: true } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_SKILLS: return setSkills( state, action );
        case actionTypes.FETCH_SKILLS_FAILED: return fetchSkillsFailed( state, action );
    }
}


export default reducer;