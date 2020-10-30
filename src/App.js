import React, { Component, Suspense} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import './App.css';


const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Register = React.lazy(() => {
  return import('./containers/Register/Register');
});

const Index = React.lazy(() => {
  return import('./containers/index');
});

const Logout = React.lazy(() => {
  return import('./containers/Auth/Logout');
});

const Users = React.lazy(() => {
  return import('./containers/Users/Users');
});

const Quiz = React.lazy(() => {
  return import('./containers/Quiz');
});

const Post = React.lazy(() => {
   return import('./containers/Post/Post');
});

const Chat = React.lazy(() => {
  return import('./containers/Chat/ChatMain');
});

const GroupChat = React.lazy(() => {
  return import('./containers/Chat/GroupChatMain');
});

class App extends Component {

  componentDidMount() {
    console.log(this.props.history);
    this.props.onChekAuth();
    if(this.props.isAuth) {
      this.props.getUser(this.props.token);
  }
  }

  render () {
    let routes = (
      <Switch>
         <Route path="/register" render={(props) => <Register {...props}/>} />
         <Route path="/auth" exact render={(props) => <Auth {...props}/>} />
         <Route path="/logout" exact render={(props) => <Logout {...props} />}/>
          <Route path="/" render={(props) => <Index {...props} />} /> 
         <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" exact render={(props) => <Logout {...props} />}/>
          <Route path="/users" exact render={(props) => <Users {...this.props}/>} />
          <Route path="/quiz" exact render={(props) => <Quiz {...props} />} />
          <Route path="/posts" exact render={(props) => <Post {...props}/>} />
          <Route path="/chat" render={(props) => <Chat {...props}/>} />
          <Route path="/group/chat" render={(props) => <GroupChat {...props}/>} />
          <Route path="/" render={(props) => <Index {...props} />} /> 
          <Redirect to="/" />
        </Switch>
      );
    }
    return(
      <div>
      <Layout>
       <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense> 
      </Layout>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChekAuth: () => dispatch(actions.checkAuth()),
    getUser: (token) => dispatch(actions.getUser(token)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
