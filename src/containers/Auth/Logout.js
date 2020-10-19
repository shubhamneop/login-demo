import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout(this.props.token);
    }
    render() {
        return <Redirect to="/" />
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