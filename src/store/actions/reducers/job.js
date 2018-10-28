import * as actionTypes from '../actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    error: null,
    loading: false
};

const jobPostStart = ( state, action) => {
    return updateObject( state, {error: null, loading: true});
};

const jobPostSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false
    });
};

const jobPostFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.JOB_POST_START: return jobPostStart(state, action);
        case actionTypes.JOB_POST_SUCCESS: return jobPostSuccess(state, action);
        case actionTypes.JOB_POST_FAIL: return jobPostFail(state, action);
        default:
            return state;
    }
};

export default reducer;