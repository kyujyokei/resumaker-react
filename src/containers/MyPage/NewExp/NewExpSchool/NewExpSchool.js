import React, { Component } from 'react';
import classes from './NewExpSchool.css';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import * as actions from '../../../../store/actions/index';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../../shared/utility';
import ReactJoyride, { STATUS } from 'react-joyride';



class NewExpSchool extends Component {

    state = {
        run: false,
        redirect: false, 
        info: {
            schoolName: {
                title: 'School Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. Oregon University'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            major: {
                title: 'Major',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. M.S. in Computer Science'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            location: {
                title: 'Location',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. Corvallis, OR'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            gpa: {
                title: 'GPA',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. 4.0'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startedDate: {
                title: 'Start Date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Start date'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            endDate: {
                title: 'Graduation Date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false,
        steps: [
            {
                content: <h3>This is the page where you can enter you educational experience</h3>,
                placement: 'center',
                locale: { skip: <strong aria-label="skip">SKIP</strong> },
                target: 'body',
            },
            {
                content: 'Enter your educational experiences here',
                placement: 'bottom',
                target: '.basic__form'
            },
            {
                content: 'Click "save" to save your input',
                placement: 'bottom',
                target: '.save__button'
            }
        ]
       
    }

    componentDidMount () {
        let tutorialShown = localStorage.getItem('schoolTutoShown');
        if (!tutorialShown) {
            this.setState({run: true});
            localStorage.setItem('schoolTutoShown', true);
        }
    }

    componentWillMount () {
        this.props.onInitSkills();
        this.props.resetSchoolState();
        if(this.props.patchSchool) {
            this.setState({info:{
                schoolName: {
                    ...this.state.info.schoolName,
                    value: this.props.patchSchool.schoolName,
                    valid: true,
                    touched: true
                },
                major: {
                    ...this.state.info.major,
                    value: this.props.patchSchool.major,
                    valid: true,
                    touched: true
                },
                location: {
                    ...this.state.info.location,
                    value: this.props.patchSchool.location,
                    valid: true,
                    touched: true
                },
                gpa: {
                    ...this.state.info.gpa,
                    value: this.props.patchSchool.gpa,
                    valid: true,
                    touched: true
                },
                startedDate: {
                    ...this.state.info.startedDate,
                    value: new Date(this.props.patchSchool.startedDate).toISOString().split('T')[0],
                    valid: true,
                    touched: true
                },
                endDate: {
                    ...this.state.info.endDate,
                    value: new Date(this.props.patchSchool.endDate).toISOString().split('T')[0],
                    valid: true,
                    touched: true
                }
            }});
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log("Major:", this.state.info.major.value);
        const updatedFormElement = updateObject(this.state.info[inputIdentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.info[inputIdentifier].validation),
            touched: true
        });
       
        const updatedInfo = updateObject(this.state.info, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let inputIdentifier in updatedInfo) {
            formIsValid = updatedInfo[inputIdentifier].valid && formIsValid;
        }
        this.setState({info: updatedInfo, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault(); // stops the page from refreshing
        if (!this.props.patchSchool){
            this.props.postSchool( this.state, false, null );
        } else {
            this.props.postSchool( this.state, true, this.props.patchId );
        }
    }

    cancelHandler = () => {
        window.location.reload();
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

        var skillsList = [];
        if (!this.props.skills) {
            skillsList = [];
        } else {
            skillsList = this.props.skills
        }

        const formElementsArray = [];
        for (let key in this.state.info) {
            formElementsArray.push({
                id: key,
                config: this.state.info[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <div key={formElement.id}>
                        <p className={classes.Title}>{formElement.config.title}</p>
                        <Input
                            className={classes.Inputs}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    </div>
                ))}
            </form>
        )

        let schoolRedirect = null;

        if (this.props.status === 200) {
            console.log("props.response: ", this.props.response)
            if ( !this.props.patchId && this.props.response._id ){
                let path = "/exps/school/" + this.props.response._id;
                schoolRedirect = <Redirect to={path} />  
            } else {
                window.location.reload();
            }
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>
            console.log(this.props.error);
        }
        return (

                <div className={classes.NewExpSchool}>
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
                    {this.props.patchSchool ? <h2 className={classes.Head}>Patch education</h2> : <h2 className={classes.Head}>Create new education</h2>}
                    <Button btnType="Help" clicked={this.handleClickStart}>? Help</Button>
                    <div className="basic__form">
                        {schoolRedirect}
                        {errorMessage}
                        {form}
                    </div>
                    <Button
                        btnType="Danger"
                        clicked={this.cancelHandler}
                        >cancel</Button>
                    <div className="save__button">
                        <Button 
                            btnType="Success" 
                            disabled={!this.state.formIsValid}
                            clicked={this.submitHandler} > save </Button>
                    </div>
                    
                </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.skill.skills,
        error: state.school.error,
        status: state.school.status,
        loading: state.school.loading,
        response: state.school.response
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitSkills: () => dispatch(actions.initSkills()),
        postSchool: ( state, isPatch, id ) => dispatch(actions.postSchool(state, isPatch, id)),
        resetSchoolState: () => dispatch(actions.schoolStateReset())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewExpSchool));