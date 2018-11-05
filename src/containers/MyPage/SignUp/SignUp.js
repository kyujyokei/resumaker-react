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
        signUpInfo: {
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
            },
            f_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            l_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    maxLength: 10,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    maxLength: 5,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            websiteURL: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Website Link'
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            },
            githubURL:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Github Link'
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        passwordMatched: false,
        isSignup: false
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

    inputChangedHandler = (event, controlName) => {
        let currentForm = this.state.info;

        if (this.state.isSignup) {
            currentForm = this.state.signUpInfo;
        }

        const updatedInfo = {
            ...currentForm,
            [controlName]: {
                ...currentForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, currentForm[controlName].validation),
                touched: true
            }
        };

        if (this.state.isSignup) {
            this.setState({signUpInfo: updatedInfo});
        } else {
            this.setState({info: updatedInfo});
        }
        
    }

    submitHandler = (event) => {
        event.preventDefault(); // stops the page from refreshing

        let authInfo = {};
        let postObject = {}; // this is what's going to be sent to server

        // Sign up
        if (this.state.isSignup) {
            authInfo = {...this.state.signUpInfo};
        } else {
            authInfo = {...this.state.info};
        }

        for (var key in authInfo) {
            postObject[key] = authInfo[key].value;
        }

        // console.log(postObject);

        this.props.onAuth( postObject, this.state.isSignup);

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {

        const formElementsArray = [];
        let currentForm = this.state.info;
        if (this.state.isSignup) {
            currentForm = this.state.signUpInfo
        } else {
            currentForm = this.state.info;
        }

        for (let key in currentForm) {
            formElementsArray.push({
                id: key,
                config: currentForm[key]
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
        onAuth: (authInfo, isSignup) => dispatch (actions.auth(authInfo, isSignup))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(SignUp));