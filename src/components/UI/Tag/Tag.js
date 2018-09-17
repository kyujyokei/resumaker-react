import React from 'react';
import classes from './Tag.css';

const Tag = (props) => {
    // class = 
    return (
        <li>
        <span className={classes['w3-tag']}>{props.children}</span>
        </li>
    );
    
};

export default Tag;