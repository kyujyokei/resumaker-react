import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import ExpsSchool from '../Exps/School/ExpsSchool';
import { Route } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';
import Modal from  '../../../../components/UI/Modal/Modal';
import Tutorial from '../Tutorial/Tutorial';
import classes from './AllExps.css'
import ReactJoyride, { STATUS } from 'react-joyride';

class AllExps extends Component {
    state = {
        run: false,
        steps: [
            {
              content: <h2>Let's begin our journey!</h2>,
              placement: 'center',
              locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
              target: 'body',
            },
            {
              content: 'These are our super awesome projects!',
              placement: 'bottom',
              styles: {
                options: {
                  width: 300
                }
              },
              target: '.job__section h3',
              title: 'JOB / PROJECTS'
            }
        ]
    }

    // toggleTutorialHandler = () => {
    //     let current = this.state.showTutorial;
    //     this.setState({showTutorial: !current});
    // }

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