import React, {Component} from 'react';
import User from './User/User';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Users.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import EditUser from './User/EditUser';
import ChatMain from '../Chat/ChatMain';
import {StreamChat} from 'stream-chat';
import {Route, withRouter} from "react-router-dom";
import axios from '../../axios-in';
import ChannelList from '../../containers/Chat/ChannelList';
import GroupChat from '../../containers/Chat/GroupChat';
import Buttom from '../../components/UI/Button/Button';

class Users extends Component {
    state = {
        chat: false,
        channels: null,
        UIDS: [],
    }
    componentDidMount() {
        if(this.props.isAuth) {
            this.props.getUser(this.props.token);
        }
        this.props.generateToken(this.props.userId, this.props.name);
        setTimeout(function (){

            this.initializeClient();
        }.bind(this), 5000);

    }


    initializeClient = async () => {
        // const {data} = await axios.post("/generate_token",{name: this.props.userId});
        // const client = new StreamChat('gbtn87gqvdg4', { timeout: 6000 });
        // await client.setUser({id: this.props.userId, name: this.props.name}, data.token);
            const filters = { type: 'team', members: { $in: [`${this.props.userId}`] } };
            const sort = { last_message_at: -1 };
            // const channels = client.queryChannels(filters, sort);
                if(this.props.client) {
                    const channels = await this.props.client.queryChannels(filters, sort, {
                        watch: true,
                        state: true,
                    });
                    this.setState({channels: channels});
                }
    }

    chatUser = (name, userId) => {
        this.props.history.push({
            pathname: '/chat/'+ name,
            search: `?uid=${userId}&&name=${name}`
        });
    }


    groupChat = (name, id) => {
        this.props.history.push({
            pathname: '/group/chat/' + name,
            search: `?id=${id}&&name=${name}`
        });
    }

    checkedHandler = (event, checked) => {
    //   event.preventDefault();
        if (checked) {
            array = this.state.UIDS.slice(); 
            array.push(event.target.value);
            this.setState({UIDS: array});
        } else {
            var array = [...this.state.UIDS];
            var index = array.indexOf(event.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({UIDS: array});
            }
        }
         return checked;
    }

    createGroup = async() => {
        if(this.props.client) {
           let  members = this.state.UIDS.slice();
           if(members.length > 0) {
                members.push(this.props.userId);
                const client = this.props.client;
                console.log(members);
                let random = Math.random().toString(36).substring(7);

                let conversation =  client.channel('team', `${random}`, {
                    name: `Group chat-${this.props.name}-${random}`,
                    image: 'http://bit.ly/2O35mws',
                    members: members,
                });
                await conversation.create();
                this.initializeClient();
                this.setState({UIDS: []});
           } else {
            alert('Select atleast one user !!');
            return false;
           }
              
        } else {
            alert('Something went wrong !!');
            return false;
        }
    }
    

    render() {
        let users = <Spinner />;
        if(this.props.users !== null) {
             users = this.props.users
            .map( user => {
                return [...Array( this.props.users[user] )].map( ( _, i ) => {
                    return <User key={user.id} id={user.id} uid={user.UID} email={user.email} name={user.name} clicked={this.props.removeUser} edit={this.props.editUser} token={this.props.token} chat={this.chatUser} checkedHandler={this.checkedHandler} />;
                } );
            } )
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
        }

        let channel = null;
        if(this.state.channels !== null) {
            channel = this.state.channels.map((channel, i) => {
                return (
                   <ChannelList key={i} name={channel.data.name} id={channel.id} chat={this.groupChat} />
                );
            });
        }

        let edit = null;

        if(this.props.show) {
            edit = <EditUser />;
        }

        let isChat = null;

        if(this.state.chat) {
            isChat = <ChatMain />
        }
        
        const tabelClass = [classes.table, classes.table_striped];
        return (
            <Aux>
             <div>
                 <Buttom clicked={this.createGroup} btnType="Success">New Group</Buttom>
                <div> 
                <table className={tabelClass.join(' ')}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users}
                    </tbody>
                </table>
                </div>
                <div>
                <table className={tabelClass.join(' ')}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {channel}
                    </tbody>
                </table>
                    
                 </div>   
             </div>   
            {/* <table className={tabelClass.join(' ')}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </table> */}
            <Modal show={this.props.show} modalClosed={this.props.editCancel}>
                {edit}
            </Modal>
            <Route path={this.props.match.url + '/:name'} exact render={(props) => <ChatMain {...props} />}  />
            <Route path={'/group/chat/:name'} render={(props) => <GroupChat {...props} />}  />

            </Aux>
        );

    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        loading: state.user.loading,
        show: state.user.show,
        name: state.auth.name,
        userId: state.auth.userId,
        client: state.chat.client,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: (token) => dispatch(actions.getUser(token)),
        removeUser: (id) => dispatch(actions.remove(id)),
        editUser: (token,id) => dispatch(actions.editUser(token,id)),
        editCancel: () => dispatch(actions.editCancel()), 
        generateToken: (id, name) => dispatch(actions.generateToken(id, name)),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Users));