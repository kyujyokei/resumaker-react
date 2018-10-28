import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

class NewSkill extends Component {

    state = {
        skillName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'You skill name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false, // check if this specific row is valid or not
            touched: false
        }
    }

    componentDidMount () {
        this.props.onInitSkills();

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedInfo = {
            ...this.state.skillName
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

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }      
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    render () {
        
        var skillsList = [];
        if (!this.props.skills) {
            skillsList = [];
        } else {
            skillsList = this.props.skills
        }

        var elementConfig = {
            type: 'text',
            placeholder: 'Enter your skill name'
        }
        return (
            <Aux>
                <p>Please make sure your tag has not yet been created : </p>
                <Select options={skillsList} />

                <Input
                elementType={'input'}
                elementConfig={elementConfig}
                value={this.state.skillName}/>
            </Aux>
        );
    };
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewSkill));
