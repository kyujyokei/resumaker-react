import React, { Component } from 'react';
import classes from './NewExpSchool.css';
import Select from 'react-select';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import * as actions from '../../../../store/actions/index';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Aux from '../../../../hoc/Aux';
import { updateObject, checkValidity } from '../../../../shared/utility';



class NewExpSchool extends Component {
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


    state = {
        redirect: false, 
        info: {
            schoolName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'School name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            major: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Major'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            gpa: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'GPA'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startedDate: {
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
        loading: false
       
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
                    <Input
                        className={classes.Inputs}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
            </form>
        )

        let schoolRedirect = null;
        if (this.props.status === 200) {
            schoolRedirect = <Redirect to="/exps/" />
            this.props.resetSchoolState();
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>
            console.log(this.props.error);
        }
        return (
            <div className={classes.NewExpSchool}>
                {schoolRedirect}
                {errorMessage}
                {form}

                <Button 
                    btnType="Success" 
                    disabled={!this.state.formIsValid}
                    clicked={this.submitHandler} > save </Button>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.skill.skills,
        error: state.school.error,
        status: state.school.status,
        loading: state.school.loading
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