import React, { Component } from 'react';
import classes from './NewExpJob.css';
import Select from 'react-select';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import Description from '../../../../components/Discription/Discription';
import * as actions from '../../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../../../hoc/Aux';


class NewExpJob extends Component {
    componentDidMount () {
        this.props.onInitSkills();
    }

    componentDidUpdate () {
        
    }

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
            }
        },
        formIsValid: false,
        loading: false,
        descriptionConfig: {
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
        },
        descriptions: [
            {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Description'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false     
        }],
        descriptionFormIsValid: false
    }

    pushDescription = () => {


        var d = {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Description'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false     
        };

        let newDescriptions = [
            ...this.state.descriptions,
            d
        ]


        // this.state.descriptions.push(d);
        this.setState({ descriptions: newDescriptions})
        console.log(this.state.descriptions);
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

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
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

    descriptionInputChangedHandler = (event, index) => {
        const updatedDescriptions = [
            ...this.state.descriptions
        ];

        const updatedDescriptionElement = {
            ...updatedDescriptions[index]
        };
        updatedDescriptionElement.value = event.target.value;
        updatedDescriptionElement.valid = this.checkValidity(updatedDescriptionElement.value, updatedDescriptionElement.validation);
        updatedDescriptionElement.touched = true;
        updatedDescriptions[index] = updatedDescriptionElement;

        let formIsValid = true;
        for (let index in updatedDescriptions) {
            formIsValid = updatedDescriptions[index].valid && formIsValid;
        }
        
        this.setState({descriptions: updatedDescriptions, descriptionFormIsValid: formIsValid})
    }

    deleteDescriptionHandler = (event, index) => {
        event.preventDefault();
        console.log(index);
        const updatedDescriptions = [
            ...this.state.descriptions
        ];
        updatedDescriptions.splice(index,1);
        this.setState({description: this.state.descriptions.splice(index, 1)});
        console.log(this.state.descriptions);
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

        let descriptionsForm = (
            <Aux>
            <form>
            <h3>Descriptions</h3>
            {this.state.descriptions.map((description, index) => (
                <div key={index} className={classes.DescriptionRow}>
                <Input
                    // key={index}
                    elementType={description.elementType}
                    elemenyConfig={description.elementConfig}
                    value={description.value}
                    invalid={!description.valid}
                    shouldValidate={description.validation}
                    touched={description.touched}
                    changed={(event) => this.descriptionInputChangedHandler(event, index)}
                    />
                <Select  className={classes.Select} options={skillsList} isMulti={true}/>
                {this.state.descriptions.length > 1 ? <Button btnType={"Danger"} clicked={(event) => this.deleteDescriptionHandler(event, index)}>X</Button> : null}
                </div>
            ))}
            </form>

                <Button btnType={"Success"} clicked={this.pushDescription}>Add Description</Button>
            </Aux>
        )

        var skillsList = [];
        if (!this.props.skills) {
            skillsList = [];
        } else {
            skillsList = this.props.skills
        }

        return (
            <div className={classes.NewExpJob}>
                {form}
                {descriptionsForm}

                <Button btnType="Success" disabled={!this.state.formIsValid}> save </Button>
                {/* <Select options={skillsList} /> */}
                {/* <Link to="/newskill">
                    <Button btnType="BlueRounded">Add New Skill</Button>
                </Link> */}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.skill.skills,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitSkills: () => dispatch(actions.initSkills())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewExpJob));