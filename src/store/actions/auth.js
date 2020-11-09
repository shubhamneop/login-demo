import * as actionTypes from './actionTypes';
import axios from '../../axios-in';
import * as actions from '../actions/index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, name, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        name: name,
        userId: userId,
    };
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};



export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        }
        axios.post('/login',authData)
        .then(response => {
            if(response.data.status) {
                localStorage.setItem('token',response.data.api_key);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('userId',response.data.userId);
                dispatch(authSuccess(response.data.api_key, response.data.name, response.data.userId));
            } else {
                dispatch(authFail());
            }
            
            // this.props.history.push( '/' );
        })
        .catch(error => {
            console.log(error)
        });
    }
};


export const register = (name, email, password) => {
    return dispatch => {
        dispatch(authStart);
        const authData = {
            name: name,
            email: email,
            password: password
        };

        axios.post('/register', authData)
        .then(response => {
            if(response.data.status){
                localStorage.setItem('token',response.data.api_key);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('userId',response.data.userId);
                dispatch(authSuccess(response.data.api_key, response.data.name, response.data.userId));
            } else {
                dispatch(authFail());
            }
            
        });
    }
}


export const checkAuth = () => {
    return dispatch => {
        dispatch(authStart());
        const token = localStorage.getItem('token');
        if(token !== null) {
            const name = localStorage.getItem('name');
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, name, userId));
            dispatch(actions.generateToken(userId, name));
        } else {
            dispatch(authFail());
        }
    }
}

export const logout = (token) => {
    return dispatch => {
           const options = {
            headers: {'Authorization': token ? `Bearer ${token}` : '',}
          };
        axios.post('/logout',null,options).then(res =>{
            if(res.data.status) {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('userId');
               dispatch(authLogout());
            } else {
                dispatch(authFail());
            }
            
        });
        
    }
}