import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import { NavLink } from 'react-router-dom';
import classes from './Layout.module.css';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faSignOutAlt, faSign, faSignInAlt, faUserPlus, faUniversity, faStickyNote, faTasks } from '@fortawesome/free-solid-svg-icons';


class Layout extends Component {
    

    render () {
        return (
            <Aux>
                <header className={classes.Toolbar}>
                <div className={classes.Logo}>
                {this.props.isAuth && this.props.name}
                </div>
                <nav>
                    <ul className={classes.NavigationItems}>
                       {!this.props.isAuth ? <li className={classes.NavigationItem}> <NavLink to="/register" exact activeClassName={classes.active} ><FontAwesomeIcon icon={faUserPlus} /> Register</NavLink> </li> : null }
                       {!this.props.isAuth ?  <li className={classes.NavigationItem}> <NavLink to="/auth" exact activeClassName={classes.active}><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink> </li> : null }
                        <li className={classes.NavigationItem}> <NavLink to="/" exact activeClassName={classes.active}><FontAwesomeIcon icon={faHome} /> Index</NavLink> </li>
                        {this.props.isAuth && <li className={classes.NavigationItem}><NavLink to="/users"  activeClassName={classes.active}><FontAwesomeIcon icon={faUserFriends} /> Users</NavLink></li>}
                        {this.props.isAuth ? <li className={classes.NavigationItem}> <NavLink to="/quiz" exact activeClassName={classes.active}><FontAwesomeIcon icon={faUniversity} /> Quiz</NavLink> </li> : null}
                        {this.props.isAuth ? <li className={classes.NavigationItem}> <NavLink to="/posts" exact activeClassName={classes.active}><FontAwesomeIcon icon={faTasks} /> Post</NavLink> </li> : null}
                        {this.props.isAuth ? <li className={classes.NavigationItem}> <NavLink to="/logout" exact activeClassName={classes.active}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavLink> </li> : null }
                        
                    </ul>
                </nav>
                </header>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.name,
        isAuth: state.auth.isAuth,
    }
}


export default connect(mapStateToProps)(Layout);