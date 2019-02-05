import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import ExpsSchool from '../Exps/School/ExpsSchool';
import { Route } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';
import ReactJoyride, { STATUS } from 'react-joyride';

class AllExps extends Component {

    state = {
        run: false,
        steps: [
            {
                content: <h3>Welcome to Resumaker! </h3>,
                placement: 'center',
                locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
                target: 'body',
            },
            {
                content: 'This is the field that stores all your job / project experiences',
                placement: 'bottom',
                styles: {
                    options: {
                    width: 300
                    }
                },
                target: '.job__section h3',
                title: 'JOB / PROJECTS'
            },
            {
                content: 'Click this button to enter a new experience card',
                placement: 'right',
                target: '.job__button Button',
                title: '+ NEW'
            }
        ]
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

            <Aux>
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
                <Button btnType="Help" clicked={this.handleClickStart}>? Help</Button>
                {/* <Modal show={this.state.showTutorial} modalClosed={this.toggleTutorialHandler}>
                    {tutorials}
                </Modal> */}
                <Route path={this.props.match.url} component={ExpsJob} />
                <Route path={this.props.match.url} component={ExpsSchool} />

            </Aux>
        );
    }
}

export default AllExps;