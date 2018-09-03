import React from 'react';
import classes from './NavigationHeader.css';



const navigationHeader = (props) => (
    <div className={classes.NavigationHeader}>
        <div className={classes.Content}>
            <h2 className={classes.Title}>Resumaker</h2>
            <nav className={classes.Nav}>
                <a href="/">Experiences</a> |  
                <a href="/">Personal Info</a>
            </nav>
        </div>
    </div>
);

export default navigationHeader;