import React, { Component } from 'react';
import classes from './NewExpJob.css';
import Select from 'react-select';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
// import Select from 'react-select';
import Description from '../../../../components/Discription/Discription';
import * as actions from '../../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class NewExpJob extends Component {
    componentDidMount () {
        this.props.onInitSkills();
        // console.log("STATE",this.props.skills);
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
        loading: false,
        discriptionNumber: 1
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

        var skillsList = [];
        if (!this.props.skills) {
            skillsList = [];
        } else {
            skillsList = this.props.skills
        }

        return (
            <div className={classes.NewExpJob}>
                {form}
                <Select options={skillsList} />
                <Link to="/newskill">
                    <Button btnType="BlueRounded">Add New Skill</Button>
                </Link>
                
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