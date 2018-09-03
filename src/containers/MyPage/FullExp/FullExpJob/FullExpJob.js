import React, { Component } from 'react';
import classes from './FullExpJob.css';

class FullExpJob extends Component {

    state = {
        loadedExp: null
    }

    render () {
        return (
            <div>
                <h1>Job Title</h1>
                <p>Date: 2015~2018</p>
                <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                </ul>
            </div>
        );
    }

}

export default FullExpJob;