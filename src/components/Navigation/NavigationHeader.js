import React from 'react';
import classes from './NavigationHeader.css';
import { NavLink, Link } from 'react-router-dom';


const navigationHeader = (props) => (
    <div className={classes.NavigationHeader}>
        <div className={classes.RightCorner}>
            {/* <a href="/login">Login</a>  |   */}
            { props.isAuth ? <a href="/logout">Logout</a> : <a href="/signup">Signin / Sign Up</a>}
        </div>
        <div className={classes.Content}>
        <Link to={'/'}>
            <h2 className={classes.Title}><b>Resumaker</b></h2>
        </Link>
            {props.isAuth ? 
                <nav className={classes.Nav}>
                <a href="/exps">Experiences</a>  |  
                <a href="/me">Personal Info</a>  |
                <NavLink to="/resume" exact>My Resume</NavLink>
                </nav>
                : null
            }
            
        </div>
    </div>
);

export default navigationHeader;