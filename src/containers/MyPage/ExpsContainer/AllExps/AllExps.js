import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import ExpsSchool from '../Exps/School/ExpsSchool';
import { Route } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';
import Modal from  '../../../../components/UI/Modal/Modal';
import Tutorial from '../Tutorial/Tutorial';
import classes from './AllExps.css'

class AllExps extends Component {
    state = {
        showTutorial: false
    }

    toggleTutorialHandler = () => {
        let current = this.state.showTutorial;
        this.setState({showTutorial: !current});
    }

    render () {
        let tutorialPage0 = <div>
                                <h3>Welcome to Resumaker! </h3>
                                <p>Let's start with managing your experiences!</p>
                                <p>Click <Button btnType="BlueRounded">+ Add</Button> to add a experience</p>
                            </div>;
        let tutorialPage1 = <div>
                                <img src="https://dummyimage.com/640x4:3"></img>
                                <p>After creating your experience card, click on them to view full details, </p>
                                <p>you can also edit or delete your experience cards</p>
                            </div>;
                                
        let tutorialPage2 = <div>
                                <img src="https://dummyimage.com/640x4:3"></img>
                                <p>Be sure to fill as much experiences and in detailed format! </p>
                                <p>They are the funamental core towards creating dynamic resumes</p>
                            </div>;
        let tutorialArray = [tutorialPage0, tutorialPage1, tutorialPage2]
        let pages = tutorialArray.length;
        let tutorials = <Tutorial totalPage={pages}>{tutorialArray}</Tutorial>;

        return (

            <Aux>
                <Button btnType="Help" clicked={this.toggleTutorialHandler}>? Help</Button>
                <Modal show={this.state.showTutorial} modalClosed={this.toggleTutorialHandler}>
                    {tutorials}
                </Modal>
                <Route path={this.props.match.url} component={ExpsJob} />
                <Route path={this.props.match.url} component={ExpsSchool} />

            </Aux>
        );
    }
}

export default AllExps;