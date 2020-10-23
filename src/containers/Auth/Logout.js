import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout(this.props.token);
        this.props.history.push('/auth');
        this.props.history.replace('/auth');
    }
    render() {
        return <Redirect to="/auth" />
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: (token) => dispatch(actions.logout(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);