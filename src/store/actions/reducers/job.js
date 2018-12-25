import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    status: null,
    isPatch: false
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

const jobStateReset = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: null
        });
}

const jobGetByIdStart = ( state, action ) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const jobGetByIdSuccess = (state, action ) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status,
        job: action.job
    });
};

const jobGetByIdFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const enablePatch = ( state, action ) => {
    return updateObject( state, {
        isPatch: action.isPatch
    });
};

const jobPatchStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const jobPatchSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status
    });
};

const jobPatchFail = ( state, action) => {
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
        case actionTypes.JOB_STATE_RESET: return jobStateReset(state, action);
        case actionTypes.JOB_GID_START: return jobGetByIdStart(state, action);
        case actionTypes.JOB_GID_SUCCESS: return jobGetByIdSuccess(state, action);
        case actionTypes.JOB_GID_FAIL: return jobGetByIdFail(state, action);
        case actionTypes.JOB_EN_PATCH: return enablePatch(state, action);
        case actionTypes.JOB_PATCH_START: return jobPatchStart(state, action);
        case actionTypes.JOB_PATCH_SUCCESS: return jobPatchSuccess(state, action);
        case actionTypes.JOB_PATCH_FAIL: return jobPatchFail(state, action);
        default:
            return state;
    }
};



export default reducer;