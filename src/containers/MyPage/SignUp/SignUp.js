import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './SignUp.css';
import * as actions from '../../../store/actions/index';
import LoadingAnimation from '../../../components/UI/LoadingAnimation/LoadingAnimation';

class SignUp extends Component {

    state = {
        info: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        passwordMatched: false,
        isSignup: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }


        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    // inputChangedHandler = (event, inputIdentifier) => {
    //     const updatedInfo = {
    //         ...this.state.info
    //     };
    //     const updatedFormElement = { 
    //         ...updatedInfo[inputIdentifier]
    //     };
    //     updatedFormElement.value = event.target.value;
    //     updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //     updatedFormElement.touched = true;
    //     updatedInfo[inputIdentifier] = updatedFormElement;
        
    //     let formIsValid = true;
    //     for (let inputIdentifier in updatedInfo) {
    //         formIsValid = updatedInfo[inputIdentifier].valid && formIsValid;
    //     }
    //     this.setState({info: updatedInfo, formIsValid: formIsValid});
    // }

    inputChangedHandler = (event, controlName) => {
        const updatedInfo = {
            ...this.state.info,
            [controlName]: {
                ...this.state.info[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.info[controlName].validation),
                touched: true
            }
        };
        this.setState({info: updatedInfo});
    }

    submitHandler = (event) => {
        event.preventDefault(); // stops the page from refreshing
        this.props.onAuth( this.state.info.email.value, this.state.info.password.value, this.state.isSignup);

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    // componentDidMount () {
    //     if (this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

    render () {

        const formElementsArray = [];
        for (let key in this.state.info) {
            formElementsArray.push({
                id: key,
                config: this.state.info[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            )
        );
        
        if (this.props.loading) {
            form = <LoadingAnimation />
        }

        let errorMsg = null;

        if (this.props.error) {
            errorMsg = (
                <p>{this.props.error}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        

        return (
            <div className={classes.SignUp}>
                {this.state.isSignup ? <p>Sign Up</p> :  <p>Sign in</p> }
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}> 
                    {form}
                    <Button btnType="Success" > submit </Button>
                </form>
                
                <Button btnType="Danger" 
                clicked={this.switchAuthModeHandler}>{this.state.isSignup ? 'Switch to SIGN IN' : ' Switch to SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch (actions.auth(email, password, isSignup))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(SignUp));