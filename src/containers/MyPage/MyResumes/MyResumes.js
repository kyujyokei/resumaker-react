import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './MyResumes.css'
import Button from '../../../components/UI/Button/Button';


class MyResumes extends Component {
    render () {
        return (
            <Aux>
                <p>Paste job description: </p><input className={classes.JobLink}></input>
                <Button btnType="BlueRounded">Generate</Button>
            </Aux>
        );
    }
}

export default MyResumes;