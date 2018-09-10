import React from 'react';
import classes from './NavigationHeader.css';
import { NavLink } from 'react-router-dom';


const navigationHeader = (props) => (
    <div className={classes.NavigationHeader}>
        <div className={classes.Content}>
            <h2 className={classes.Title}>Resumaker</h2>
            <nav className={classes.Nav}>
                <a href="/exps">Experiences</a>  |  
                <a href="/me">Personal Info</a>  |
                {/* <NavLink to="/me" exact>Personal Info</NavLink> */}
            </nav>
        </div>
    </div>
);

export default navigationHeader;