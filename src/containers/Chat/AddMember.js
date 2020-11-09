import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './AddMember.css';
import { Button } from '@material-ui/core';

class AddMember extends Component {
    state = {
        Ids: [],
        disabled: true,
    }
    
    checkedHandler = (event, checked) => {
        //   event.preventDefault();
            if (checked) {
                array = this.state.Ids.slice(); 
                array.push(event.target.value);
                console.log(array);
                this.setState({Ids: array, disabled: false});
            } else {
                var array = [...this.state.Ids];
                var index = array.indexOf(event.target.value)
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({Ids: array});
                    console.log(array);
                }
                if(array.length == 0) {
                    this.setState({disabled: true});
                }
            }
             return checked;
        }

    render() {
        let show = null;
        if(this.props.show) {

        show = this.props.users.map((user, i) => {
            return(
                <p className="list" key={i}><input type="checkbox" value={user.UID} onChange={event => this.checkedHandler(event, event.target.checked)} /> { user.name}</p>
            );
          })
        }
        return (
            <div>
               <center><label>Add Member</label></center> 
                {show}
                <center><Button variant="outlined" size="small" color="primary" disabled={this.state.disabled} onClick={() => this.props.addMember(this.state.Ids)}>Add</Button></center>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.chat.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getChatUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddMember);