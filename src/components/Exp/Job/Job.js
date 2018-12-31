import React from 'react';
import classes from './Job.css';
import Tags from '../../Tags/Tags';
import Tag from '../../UI/Tag/Tag';

var skillNames = [];

const job = (props) => {
    return(
    <article className={classes.Job} onClick={props.clicked}>
        <h3 className={classes.Title}>{props.title}</h3>
        <h4 className={classes.CompanyName}>{props.company}</h4>
        {
            props.descriptions.map(des => {
                des.skills.map(skill => {
                    // console.log(skill);
                    skillNames.push(skill.skillName);
                })
            })
        }
        <Tags>
        {
            skillNames.map(s => {
                return <Tag key={s}>{s}</Tag>
            })
        }
        </Tags>
        {skillNames = []}
        <p className={classes.Date}>{props.startedDate}~{props.endDate}</p>
        {/* <p>{props.description}</p> */}
    </article>
    )
};

export default job;