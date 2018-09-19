import React, {Component} from 'react';
import classes from './NewExpJob.css';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Select from 'react-select';

class NewExpJob extends Component {



    state = {
        info: {
            jobTitle: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            CompanyName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Start date'
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
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
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
        const updatedInfo = {
            ...this.state.info
        };
        const updatedFormElement = { 
            ...updatedInfo[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedInfo[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedInfo) {
            formIsValid = updatedInfo[inputIdentifier].valid && formIsValid;
        }
        this.setState({info: updatedInfo, formIsValid: formIsValid});
    }

    render () {

        const scaryAnimals = [
            { label: "Alligators", value: 1 },
            { label: "Crocodiles", value: 2 },
            { label: "Sharks", value: 3 },
            { label: "Small crocodiles", value: 4 },
            { label: "Smallest crocodiles", value: 5 },
            { label: "Snakes", value: 6 },
          ];

        
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
            <div className={classes.NewExpJob}>
                {form}
                <Select options={scaryAnimals} />
            </div>
        );
    }
}

export default NewExpJob;