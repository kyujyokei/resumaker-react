import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../shared/utility';

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

const jobGetByIdStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const jobGetByIdSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status,
        job: action.job
    });
};

const jobGetByIdFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.JOB_POST_START: return jobPostStart(state, action);
        case actionTypes.JOB_POST_SUCCESS: return jobPostSuccess(state, action);
        case actionTypes.JOB_POST_FAIL: return jobPostFail(state, action);
        case actionTypes.JOB_POST_RESET: return jobPostReset(state, action);
        case actionTypes.JOB_GID_START: return jobGetByIdStart(state, action);
        case actionTypes.JOB_GID_SUCCESS: return jobGetByIdSuccess(state, action);
        case actionTypes.JOB_GID_FAIL: return jobGetByIdFail(state, action);
        default:
            return state;
    }
};



export default reducer;