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

const schoolPostReset = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: null
        });
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.SCHOOL_POST_START: return schoolPostStart(state, action);
        case actionTypes.SCHOOL_POST_SUCCESS: return schoolPostSuccess(state, action);
        case actionTypes.SCHOOL_POST_FAIL: return schoolPostFail(state, action);
        case actionTypes.SCHOOL_POST_RESET: return schoolPostReset(state, action);
        default:
            return state;
    }
};

export default reducer;