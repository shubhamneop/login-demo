import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    isPost : false,
    posts: null,

}

const postSuccess = (state, action) => {
    return updateObject(state, {isPost: true});
}

const setPost = (state, action) => {
    return updateObject(state, {posts: action.posts});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.POST_INIT: return state;
        case actionType.POST_SUCCESS: return postSuccess(state, action);
        case actionType.ALL_POST: return setPost(state, action);
        default: return state;

    }
}


export default reducer;
