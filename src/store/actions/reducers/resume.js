import * as actionTypes from '../actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    error: null,
    loading: false,
    status: null,
    data: null
};

const resPostStart = ( state, action) => {
    return updateObject( state, {
        error: null, 
        loading: true,
        status: null,
        data: null
    });
};

const resPostSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: action.status,
        data: action.data
    });
};

const resPostFail = ( state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        status: action.status,
        data: null
    });
};

const resPostReset = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        status: null,
        data: null
        });
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.RES_POST_START: return resPostStart(state, action);
        case actionTypes.RES_POST_SUCCESS: return resPostSuccess(state, action);
        case actionTypes.RES_POST_FAIL: return resPostFail(state, action);
        case actionTypes.RES_POST_RESET: return resPostReset(state, action);
        default:
            return state;
    }
};

export default reducer;