import React, { Component } from 'react';
import TopImage from '../../../assets/images/front.png';
import classes from './CoverPage.css';

class CoverPage extends Component {
    render () {
        return (
            <div className={classes.Background}>
                {/* <img src={TopImage} className={classes.TopImage}/> */}
                <h1>Welcome!</h1>
                <h3>This is an alpha version of Resumaker</h3>
                <p>Please try it out and let me know your feedback!</p>
                <p></p>
            </div>
        );
    }
}

export default CoverPage;