import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState = {
    token: null,
    name: null,
    isAuth: false,
    error: null,
    authRedirectPath: '/',
}

const authStart = (state, action) => {
    return updateObject(state, {error: null});
};

const authSuccess = (state, action) => {
    return updateObject(state, {token: action.token,name: action.name, isAuth: true});
};

const authFail = (state, action) => {
    return updateObject(state, {isAuth: false});
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null,name: null, isAuth: false});
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionsType.AUTH_START : return authStart(state, action);
        case actionsType.AUTH_SUCCESS : return authSuccess(state, action);
        case actionsType.AUTH_FAIL : return authFail(state, action);
        case actionsType.AUTH_LOGOUT : return authLogout(state,action);
        default : return state;

    }
}

export default reducer;