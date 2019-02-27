import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import ExpsSchool from '../Exps/School/ExpsSchool';
import { Route } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';
import ReactJoyride, { STATUS } from 'react-joyride';
import classes from './AllExps.css';

class AllExps extends Component {

    state = {
        run: false,
        steps: [
            {
                content: 'Let\'s walk thourgh how to input your experiences',
                placement: 'center',
                title:<h3>Welcome to Resumaker! </h3>,
                locale: { skip: <strong aria-label="skip">SKIP</strong> },
                target: 'body',
            },
            {
                content: 'This experience page will keep track of all your experiences. A.k.a, your contents to generate resumes. Each experience will be stored in a card.',
                target: '.nav__ ',
                title: 'Experiences'
            },
            {
                content: 'This is the field that stores all your job / project experiences',
                placement: 'bottom',
                target: '.job__section h3',
                title: 'JOB / PROJECTS'
            },
            {
                content: 'Click this button to enter a new experience card regarding your ob experience',
                placement: 'right',
                target: '.job__button Button',
                title: '+ NEW'
            },
            {
                content: 'This is the field that stores all your educational experiences, same thing, click "+NEW" button to add a new card regarding your educational experience',
                placement: 'bottom',
                target: '.school__section h3',
                title: 'EDUCATION'
            },
            {
                content: 'You can always click on the HELP button to read this guide again',
                placement: 'left',
                target: '.help__button Button'
            },

        ]
    }

    componentDidMount(){
        let tutorialShown = localStorage.getItem('expTutoShown');
        if (!tutorialShown) {
            this.setState({run: true});
            localStorage.setItem('expTutoShown', true);
        }
    }

    handleJoyrideCallback = data => {
        const { status, type } = data;
    
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          this.setState({ run: false });
        }
    
        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };

    handleClickStart = e => {
        e.preventDefault();
    
        this.setState({
          run: true
        });
    };

    render () {

        return (

            <div className={classes.Content}>
                <ReactJoyride
                    callback={this.handleJoyrideCallback}
                    continuous
                    run={this.state.run}
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    steps={this.state.steps}
                    styles={{
                        options: {
                        zIndex: 10000,
                        }
                    }}
                    />
                <div className="help__button">
                <Button btnType="Help" clicked={this.handleClickStart}>? Help</Button>
                </div>
                {/* <Modal show={this.state.showTutorial} modalClosed={this.toggleTutorialHandler}>
                    {tutorials}
                </Modal> */}
                <Route path={this.props.match.url} component={ExpsJob} />
                <Route path={this.props.match.url} component={ExpsSchool} />

            </div>
        );
    }
}

export default AllExps;