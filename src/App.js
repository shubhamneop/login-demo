import React, { Component, Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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

class App extends Component {

  componentDidMount() {
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
