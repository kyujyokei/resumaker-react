import React from 'react';
import classes from './School.css';
import Tags from '../../Tags/Tags';
import Tag from '../../UI/Tag/Tag';

var skillNames = [];

const school = (props) => (
    <article className={classes.School} onClick={props.clicked}>
        <h3 className={classes.SchoolName}>{props.schoolName}</h3>
        <h4>{props.major}</h4>
        <p>GPA: {props.gpa}</p>
        {/* {
            props.descriptions.map(des => {
                des.skills.map(skill => {
                    // console.log(skill);
                    skillNames.push(skill.skillName);
                })
            })
        } */}
        {/* <Tags>
        {
            skillNames.map(s => {
                return <Tag key={s}>{s}</Tag>
            })
        }
        </Tags>
        {skillNames = []} */}
        <p className={classes.Date}>{props.startedDate}~{props.endDate}</p>
        {/* <p>{props.description}</p> */}
    </article>
);

export default school;