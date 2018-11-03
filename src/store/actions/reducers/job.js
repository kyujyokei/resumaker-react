import * as actionTypes from '../actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    error: null,
    loading: false,
    status: null
};

const jobPostStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const jobPostSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status
    });
};

const jobPostFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const jobPostReset = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: null
        });
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.JOB_POST_START: return jobPostStart(state, action);
        case actionTypes.JOB_POST_SUCCESS: return jobPostSuccess(state, action);
        case actionTypes.JOB_POST_FAIL: return jobPostFail(state, action);
        case actionTypes.JOB_POST_RESET: return jobPostReset(state, action);
        default:
            return state;
    }
};

export default reducer;