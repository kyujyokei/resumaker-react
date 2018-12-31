import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { checkValidity } from '../../../shared/utility';


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

    inputChangedHandler = (event) => {
        const updatedInfo = {
            ...this.state.skillName
        };

        updatedInfo.value = event.target.value;
        updatedInfo.valid = checkValidity(updatedInfo.value, updatedInfo.validation);
        updatedInfo.touched = true;

        let formIsValid = true;
        for (let inputIdentifier in updatedInfo) {
            formIsValid = updatedInfo[inputIdentifier].valid && formIsValid;
        }
        console.log(this.state.skillName.value);
        this.setState({skillName: updatedInfo, formIsValid: formIsValid});
        
    }


    postSkillHandler = (event) => {
        event.preventDefault(); // stops the page from refreshing
        this.props.postSkill( this.state );
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
                <p>Please make sure your tag has not been created in the list below : </p>
                <Select options={skillsList} />
                <br/><br/>
                <p>If you're sure it's a new tag...</p>
                <Input
                elementType={'input'}
                elementConfig={elementConfig}
                value={this.state.skillName.value}
                changed={this.inputChangedHandler}/>
                <Button 
                    btnType="Success"
                    clicked={this.postSkillHandler}>Post</Button>
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
        onInitSkills: () => dispatch(actions.initSkills()),
        postSkill: (state) => dispatch(actions.postSkill(state)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewSkill));
