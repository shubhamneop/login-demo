import * as actionType from './actionTypes';
import axios from '../../axios-in';

export const postInit = () => {
    return {
        type: actionType.POST_INIT,
    };
};


export const postSuccess = () => {
    return {
        type: actionType.POST_SUCCESS,
    };
};


export const storePost = (token,data) => {
    return dispatch => {
        dispatch(postInit());
        const options = {
            headers: {'Authorization': token ? `Bearer ${token}` : '',}
          };
        axios.post('/posts',data,options).then(res => {
            if(res.data.status) {
                dispatch(postSuccess());
                dispatch(getPosts(token));
            }
        })

    };
};

export const allPost = (posts) => {
    return {
        type: actionType.ALL_POST,
        posts: posts,
    }
}

export const getPosts = (token) => {
    return dispatch => {
        dispatch(postInit());
        const options = {
            headers: {'Authorization': token ? `Bearer ${token}` : '',}
          };
        axios.get('/posts',options).then(res => {
            if(res.data.status) {
                dispatch(allPost(res.data.posts));
            }
        });

    }
}