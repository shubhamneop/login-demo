import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState = {
    client: null,
    users: null,
    member: null,
}

const setClient = (state, action) => {
    return updateObject(state, {client: action.client});
}

const setChatUser = (state, action) => {
    return updateObject(state, { users: action.users});
}

const setChatUserFail = (state, action) => {
    return updateObject(state, {users: null});
}

const setChatMember = (state, action) => {
    return updateObject(state, {members: action.members})
}

 const  reducer = (state = initialState, action) => {
     switch(action.type) {
         case actionType.CHAT_INIT:  return state;
         case actionType.CHAT_SET_CLIENT: return setClient(state, action);
         case actionType.SET_CHAT_USER: return setChatUser(state, action);
         case actionType.SET_CHAT_USER_FAIL: return setChatUserFail(state, action);
         case actionType.SET_CHAT_MEMBER: return setChatMember(state, action);
         default: return state;
     }
 }


 export default reducer;