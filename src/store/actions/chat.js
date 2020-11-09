import * as actionType from './actionTypes';
import { StreamChat } from 'stream-chat';
import axios from '../../axios-in';


export const initChat = () => {
    return {
        type: actionType.CHAT_INIT,
    }
}


export const setClient = (client) => {
    return {
        type: actionType.CHAT_SET_CLIENT,
        client: client,
    };
};


export const  generateToken = (id, name) => {
    return async dispatch => {
        dispatch(initChat());
        const {data} = await axios.post("/generate_token",{name: id});
        const client = new StreamChat('gbtn87gqvdg4', { timeout: 6000 });
        await client.setUser({id: id, name: name}, data.token);
        dispatch(setClient(client));
    };
};

export const setChatUser = (users) => {
    return {
        type: actionType.SET_CHAT_USER,
        users: users,
    };
};

export const setChatUserFail = () => {
    return {
        type: actionType.SET_CHAT_USER_FAIL,
    }
}

export const getChatUser = (data) => {
    return dispatch => {
        axios.post('/get_users',data).then(res =>{
            if(res.data.status) {
                dispatch(setChatUser(res.data.users));
            } else {
                dispatch(setChatUserFail());
            }
            
        });   
    }
}

export const getChatMember = (data) => {
    return dispatch => {
        axios.post('/get_member',data).then(res =>{
            if(res.data.status) {
                dispatch(setChatMember(res.data.users));
            } else {
                dispatch(setChatUserFail());
            }
            
        });   
    }
}



export const setChatMember = (members) => {
    return{ 
        type: actionType.SET_CHAT_MEMBER,
        members: members,
    };
};

