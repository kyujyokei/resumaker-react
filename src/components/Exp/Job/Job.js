import React from 'react';
import classes from './Job.css';
import Tags from '../../Tags/Tags';

const job = (props) => (
    <article className={classes.Job} onClick={props.clicked}>
        <h3 className={classes.Title}>{props.title}</h3>
        <h4 className={classes.CompanyName}>{props.company}</h4>
        <Tags />
        <p className={classes.Date}>{props.date}</p>
        <p>{props.description}</p>
    </article>
);

export default job;