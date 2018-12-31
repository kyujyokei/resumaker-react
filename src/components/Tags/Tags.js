import React from 'react';
import classes from './Tags.css';

const Tags = (props) => {
    return(
        
    <div className={classes.Tags}>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <p>
        {props.children}
    </p>

    </div>
    );
    
};

export default Tags;