import React, {Component} from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';

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
                ));
        

        return (
            <div>
                <form onSubmit={this.submitHandler}> 
                    {form}
                    <Button btnType="Success" > submit </Button>
                </form>
                
                <Button btnType="Danger" 
                clicked={this.switchAuthModeHandler}>{this.state.isSignup ? 'SIGN IN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch (actions.auth(email, password, isSignup))
    }
}

export default connect(null, mapDispatchProps)(SignUp);