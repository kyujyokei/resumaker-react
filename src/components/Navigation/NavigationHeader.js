import React from 'react';
import classes from './NavigationHeader.css';
import { NavLink, Link } from 'react-router-dom';
import Button from '../UI/Button/Button';

const navigationHeader = (props) => (
    <div className={classes.NavigationHeader}>
        {/* <div className={classes.RightCorner}>
            { props.isAuth ? <a href="/logout">Logout</a> : <a href="/signup">Signin / Sign Up</a>}
        </div> */}
        <div className={classes.Content}>
        <Link to={'/'}>
            <h2 className={classes.Title}><b>Resumaker</b>:α</h2>
        </Link>
            {props.isAuth ? 
                <nav className={classes.Nav}>
                <a href="/exps">Experiences</a>    |  
                <a href="/me">    Personal Info</a>    |
                <NavLink to="/resume" exact>    My Resume</NavLink>
                </nav>
                : null
            }
            {props.isAuth ? <a href="/logout"><Button btnType="Auth">Logout</Button></a> : <a href="/signup"><Button btnType="Auth">Signin / Sign Up</Button></a>}
            {/* { props.isAuth ? <a className={classes.RightCorner} href="/logout">Logout</a> : <a className={classes.RightCorner} href="/signup">Signin / Sign Up</a>} */}
        </div>
    </div>
);

export default navigationHeader;