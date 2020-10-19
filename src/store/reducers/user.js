import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    users: null,
    userEdit: null,
    loading: false,
    id: null,
    show: false,
};

const userInit = (state, action) => {
    return updateObject(state, {loading: true});
}

const userSuccess = (state, action) => {
    return updateObject(state, {users: action.users, loading: false});
}

const userFail = (state, action) => {
    return updateObject(state, {loading: false});
}

const userRemove = (state, action) => {
    return updateObject(state, {users: state.users.filter(u => u.id !== action.userId), loading: false});
}

const editInit = (state, action) => {
    return updateObject(state, {id:action.id});
}

const editUser = (state, action) => {
    return updateObject(state, {userEdit: action.user, loading:false, show: true});
}

const editCancel = (state, action) => {
    return updateObject(state, {userEdit:null,id:null, show: false});
}

const editFail = (state, action) => {
    return updateObject(state, {userEdit:null,id:null,show: false});
}

const updateUser = (state, action) => {
    return updateObject(state,{userEdit:null, show: false, id: null});
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionType.USER_INIT: return userInit(state, action);
        case actionType.USER_GET_SUCCESS: return userSuccess(state, action);
        case actionType.USER_GET_FAIL: return userFail(state, action);
        case actionType.USER_REMOVE: return  userRemove(state, action);
        case actionType.USER_EDIT_INIT: return editInit(state, action);
        case actionType.USER_EDIT: return editUser(state, action);
        case actionType.USER_EDIT_CANCEL: return editCancel(state, action);
        case actionType.USER_EDIT_FAIL: return editFail(state, action);
        case actionType.USER_UPDATE: return updateUser(state, action);
        default: return state;
    }
}


export default reducer;