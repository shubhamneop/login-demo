import * as actionTypes from './actionTypes';
import axios from '../../axios-in';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, name) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        name: name,
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
            localStorage.setItem('token',response.data.api_key);
            localStorage.setItem('name', response.data.name);
            dispatch(authSuccess(response.data.api_key, response.data.name));
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
                dispatch(authSuccess(response.data.api_key, response.data.name));
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
            dispatch(authSuccess(token, name));
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
               dispatch(authLogout());
            } else {
                dispatch(authFail());
            }
            
        });
        
    }
}