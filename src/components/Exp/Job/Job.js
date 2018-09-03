import React from 'react';
import classes from './Job.css';

const job = (props) => (
    <article className={classes.Job}>
        <h3 className={classes.Title}>{props.title}</h3>
        <p>{props.date}</p>
        <p>{props.description}</p>
    </article>
);

export default job;