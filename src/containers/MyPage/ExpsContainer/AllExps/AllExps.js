import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import ExpsSchool from '../Exps/School/ExpsSchool';
import { Route } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';
import Modal from  '../../../../components/UI/Modal/Modal';
import Tutorial from '../Tutorial/Tutorial';
// import classes from './AllExps.css'

class AllExps extends Component {
    state = {
        showTutorial: false
    }

    toggleTutorialHandler = () => {
        let current = this.state.showTutorial;
        this.setState({showTutorial: !current});
    }

    render () {
        let tutorialElement1 = <img src="https://pbs.twimg.com/media/DwxRC8SUwAALdGI.jpg"></img>;
        let tutorials = <Tutorial
                            totalPage={3}>{['The display property specifies the display behavior (the type of rendering box) of an element.In HTML, the default display property value is taken from the HTML specifications or from the browser/user default style sheet. The default value in XML is inline, including SVG elements.',
                                            tutorialElement1,
                                            'c']}</Tutorial>;

        return (

            <Aux>
                <Button btnType="Help" clicked={this.toggleTutorialHandler}>?</Button>
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