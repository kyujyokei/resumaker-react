import React, { Component } from 'react';
import TopImage from '../../../assets/images/top.jpg';
import classes from './CoverPage.css';

class CoverPage extends Component {
    render () {
        return (
            <div>
                <img src={TopImage} className={classes.TopImage}/>
                <h1>Welcome!</h1>
                <h3>This is how it works...</h3>
                <p>React's PureComponent does not implement shouldComponentUpdate, but it takes a similar approach to preventing updates. When a "pure" component updates, it will do a shallow comparison of its current props and state to the next props and state. If the comparison does not detect any differences, the component will not update. Like with shouldComponentUpdate, that means that in order to force a "pure" component to update when the location changes, it needs to have a prop or state that has changed.</p>
            </div>
        );
    }
}

export default CoverPage;