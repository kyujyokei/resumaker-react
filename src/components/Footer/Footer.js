import React from 'react';
import classes from './Footer.css';



const footer = (props) => {
    var d = new Date();
    var year = d.getFullYear();
    return (
        <div className={classes.Footer}>
            <p>Copyright © {year} <a href="https://kyujyokei.github.io/">Kejo Hsieh</a> </p>
        </div>
    );
}

export default footer;