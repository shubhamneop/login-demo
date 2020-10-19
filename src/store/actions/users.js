import * as actionType from './actionTypes';
import axios from '../../axios-in';


export const initUser = () => {
    return { 
        type: actionType.USER_INIT
    };
};


export const userSuccess = (users) => {
    return  {
        type: actionType.USER_GET_SUCCESS,
        users: users,
    };
};

export const userFail = () => {
    return {
        type: actionType.USER_GET_FAIL,
    };
};

export const removeUser = (userId) => {
    return {
        type: actionType.USER_REMOVE,
        userId: userId,
    };
};

export const getUserInit = () => {
    return {
        type: actionType.USER_GET_INIT,
    };
};
 

export const getUser = (token) => {
    return dispatch => {
        dispatch(initUser());
        const options = {
            headers: {'Authorization': token ? `Bearer ${token}` : '',}
          };
        axios.get('/users',options).then(res =>{
            if(res.data.status) {
               dispatch(userSuccess(res.data.users));
            } else {
                dispatch(userFail());
            }
        });


    }
}

export const edit = (user,id) => {
    return {
        type: actionType.USER_EDIT,
        user: user,
        id: id,
    }
}


export const remove = (id) => {
    return dispatch => {
        dispatch(initUser());
        axios.delete(`/delete/${id}`).then(res => {
            if(res.data.status) {
                dispatch(removeUser(id));
            }
        });
    }
}

export const editInit = (id) => {
    return {
        type: actionType.USER_EDIT_INIT,
        id: id,
    }
}


export const editUser = (token,id) => {
    return dispatch => {
        dispatch(editInit(id));
        const options = {
            headers: {'Authorization': token ? `Bearer ${token}` : '',}
          };
        axios.get(`edit/${id}`,options).then(response => {
            if (response.data.status) {
                dispatch(edit(response.data.user,id));
            } else {
                dispatch(editFail());   
            }
        });
    }
}

export const editCancel = () => {
    return {
        type: actionType.USER_EDIT_CANCEL,
    }
}

export const editFail = () => {
    return {
        type: actionType.USER_EDIT_FAIL,
    }
}

export const update = () => {
    return {
        type: actionType.USER_UPDATE,
    }
}


export const userUpdate = (token,id,data) => {
    return dispatch => {
        const options = {
            headers: {'Authorization': token ? `Bearer ${token}` : '',}
          };
        axios.post(`update/${id}`,data,options).then(response => {
            if (response.data.status) {
                dispatch(update());
                dispatch(getUser(token));
            } else {
                dispatch(editFail());
            }
        });   
    }
}