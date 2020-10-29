import React, {Component} from 'react';
import Chat from './Chat';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';


class ChatMain  extends Component {
    state = {
        toUserId: null,
        toUserName: null,
    }
componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    if(params.uid && params.name) {
        this.setState({toUserId: params.uid, toUserName: params.name});
    }
   
}
    render() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        return(
            <Chat toUserId={params.uid} toUserName={params.name} userId={this.props.userId} name={this.props.name}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        name: state.auth.name,
    }
}

export default withRouter(connect(mapStateToProps)(ChatMain));