import React from 'react';
import Tag from '../UI/Tag/Tag';
import Aux from '../../hoc/Aux';
import classes from './Tags.css';

const Tags = (props) => {
    return(
        
    <div className={classes.Tags}>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <p>
        <Tag >Javascript</Tag>
        <Tag >Node.js</Tag> 
        <Tag >Reactjs</Tag>
    </p>

    </div>
    );
    
};

export default Tags;