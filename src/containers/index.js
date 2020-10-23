import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';
import {HeroImage} from './Gallery/HeroImage';
import Gallery from './Gallery/Gallery';
import Aux from '../hoc/Aux/Aux';
import Users from '../containers/Users/Users';



class Index extends React.Component {

    componentDidMount() {
        if(!this.props.isAuth) {
            this.props.history.push('/auth');
        } else {
            this.props.history.replace('/');
        }
    }

    componentDidUpdate() {
        if(!this.props.isAuth) {
            this.props.history.push('/auth');
        }
    }

    
    render() {
        let users = null;
        if(this.props.isAuth) {
           users = <Users />;
        }
        return (
            <Aux>
            <div style={{width: "80%", margin: "20px auto", border: "1px solid #eee", boxShadow: "0 2px 3px #ccc", textAlign: "center"}}>
                <h1>WelCome TO Demo !</h1>

            </div>
            <div>
                <HeroImage />
                <Gallery />
            </div>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Index);