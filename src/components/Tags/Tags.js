import React from 'react';
import classes from './Tags.css';

const Tags = (props) => {
    return(
        
    <div className={classes.Tags}>
    <p>
        {props.children}
    </p>

    </div>
    );
    
};

export default Tags;