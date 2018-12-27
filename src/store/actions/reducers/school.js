import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    status: null
};

const schoolPostStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const schoolPostSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status
    });
};

const schoolPostFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};


const schoolStateReset = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: null
        });
}

const schoolGetByIdStart = ( state, action ) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const schoolGetByIdSuccess = (state, action ) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status,
        school: action.school
    });
};

const schoolGetByIdFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const enableSchoolPatch = ( state, action ) => {
    return updateObject( state, {
        isPatch: action.isPatch
    });
};

const schoolPatchStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const schoolPatchSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status
    });
};

const schoolPatchFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.SCHOOL_POST_START: return schoolPostStart(state, action);
        case actionTypes.SCHOOL_POST_SUCCESS: return schoolPostSuccess(state, action);
        case actionTypes.SCHOOL_POST_FAIL: return schoolPostFail(state, action);
        case actionTypes.SCHOOL_STATE_RESET: return schoolStateReset(state, action);
        case actionTypes.SCHOOL_GID_START: return schoolGetByIdStart(state, action);
        case actionTypes.SCHOOL_GID_SUCCESS: return schoolGetByIdSuccess(state, action);
        case actionTypes.SCHOOL_GID_FAIL: return schoolGetByIdFail(state, action);
        case actionTypes.SCHOOL_EN_PATCH: return enableSchoolPatch(state, action);
        case actionTypes.SCHOOL_PATCH_START: return schoolPatchStart(state, action);
        case actionTypes.SCHOOL_PATCH_SUCCESS: return schoolPatchSuccess(state, action);
        case actionTypes.SCHOOL_PATCH_FAIL: return schoolPatchFail(state, action);
        default:
            return state;
    }
};

export default reducer;