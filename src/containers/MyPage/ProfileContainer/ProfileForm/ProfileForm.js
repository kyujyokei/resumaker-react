import React, {Component} from 'react';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../../../shared/utility';


class ProfileForm extends Component {
    state = {
        info: {
            f_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: this.props.children.f_name,
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
                value: this.props.children.l_name,
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
                value: this.props.children.phone,
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
                value: this.props.children.address,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: this.props.children.email,
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
            
        },
        formIsValid: false,
        loading: false
    }



    inputChangedHandler = (event, inputIdentifier) => {

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
        console.log(this.state.info);
    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.info) {
            formElementsArray.push({
                id: key,
                config: { ...this.state.info[key]}
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                
                <Button btnType="Success" disabled={!this.state.formIsValid}> save </Button>
            </form>
        )
        return (
            <div>
                {form}
            </div>
        );
    }


}

export default ProfileForm;