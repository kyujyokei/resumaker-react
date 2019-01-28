import React, {Component} from 'react';
import classes from './NavigationHeader.css';
import { NavLink, Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


class navigationHeader extends Component {

    state = {
        exps: false,
        me: false,
        resume: false
    }
    
    render (){
        console.log('Navigation: ' ,this.state);
        let path = this.props.location.pathname;
        // let topPage = this.props.top ? "NavigationHeaderTop" : "NavigationHeader";

        return (
            <div className={[classes.NavigationHeader, classes[this.props.bgType]].join(' ')}>
                {/* <div className={classes.RightCorner}>
                    { props.isAuth ? <a href="/logout">Logout</a> : <a href="/signup">Signin / Sign Up</a>}
                </div> */}
                <div className={classes.Content}>
                <Link to={'/'}>
                    <h2 className={classes.Title}><b>Resumaker</b>:α</h2>
                </Link>
                    {this.props.isAuthenticated ? 
                        <nav className={classes.Nav}>
                        {path === '/exps' ? <a><b>Experiences</b></a> : <a href="/exps">Experiences</a>}    |  
                        {path === '/me' ? <a><b>Personal Info</b></a>: <a href="/me">Personal Info</a>}    |
                        {path === '/resume' ? <a><b>Resume</b></a>: <a href="/resume">Resume</a>} 
                        {/* <NavLink to="/resume" exact>My Resume</NavLink> */}
                        </nav>
                        : null
                    }
                    {this.props.isAuthenticated ? <a href="/logout"><Button btnType="Logout">Logout</Button></a> : <a href="/signup"><Button btnType="Login">Signin / Sign Up</Button></a>}
                    {/* { props.isAuth ? <a className={classes.RightCorner} href="/logout">Logout</a> : <a className={classes.RightCorner} href="/signup">Signin / Sign Up</a>} */}
                </div>
            </div> 
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchProps = dispatch => {
    return {
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchProps)(navigationHeader));