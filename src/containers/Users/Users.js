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
import {Route, withRouter} from "react-router-dom";


class Users extends Component {
    state = {
        chat: false,
    }
    componentDidMount() {
        console.log(this.props);
        if(this.props.isAuth) {
            this.props.getUser(this.props.token);
        }
    }

    chatUser = (name, userId) => {
        this.props.history.push({
            pathname: '/chat/'+ name,
            search: `?uid=${userId}&&name=${name}`
        });
    }
    

    render() {
        let users = <Spinner />;
        if(this.props.users !== null) {
             users = this.props.users
            .map( user => {
                return [...Array( this.props.users[user] )].map( ( _, i ) => {
                    return <User key={user.id} id={user.id} uid={user.UID} email={user.email} name={user.name} clicked={this.props.removeUser} edit={this.props.editUser} token={this.props.token} chat={this.chatUser} />;
                } );
            } )
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
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
            <Modal show={this.props.show} modalClosed={this.props.editCancel}>
                {edit}
            </Modal>
            <Route path={this.props.match.url + '/:name'} exact render={(props) => <ChatMain {...props} />}  />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: (token) => dispatch(actions.getUser(token)),
        removeUser: (id) => dispatch(actions.remove(id)),
        editUser: (token,id) => dispatch(actions.editUser(token,id)),
        editCancel: () => dispatch(actions.editCancel()), 
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Users));