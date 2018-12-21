import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    status: null,
    profile: {}
};

const proPatchStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null
    });
};

const proPatchSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status
    });
};

const proPatchFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const proPatchReset = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: null
        });
};

const fetchProfileFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        status: action.status
    });
};

const setProfile = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        status: action.status,
        profile: action.profile,
        error: false 
    });
};

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.PRO_PATCH_START: return proPatchStart(state, action);
        case actionTypes.PRO_PATCH_SUCCESS: return proPatchSuccess(state, action);
        case actionTypes.PRO_PATCH_FAIL: return proPatchFail(state, action);
        case actionTypes.PRO_PATCH_RESET: return proPatchReset(state, action);
        case actionTypes.SET_PRO: return setProfile(state, action);
        case actionTypes.FETCH_PRO_FAILED: return fetchProfileFailed(state.action);
        default:
            return state;
    }
};

export default reducer;