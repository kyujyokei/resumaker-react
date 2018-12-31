import React from 'react';
import classes from './School.css';


const school = (props) => (
    <article className={classes.School} onClick={props.clicked}>
        <h3 className={classes.SchoolName}>{props.schoolName}</h3>
        <h4>{props.major}</h4>
        <p>GPA: {props.gpa}</p>

        <p className={classes.Date}>{props.startedDate}~{props.endDate}</p>

    </article>
);

export default school;