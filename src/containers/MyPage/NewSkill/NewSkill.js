import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions/index';
import { withRouter, Router } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { checkValidity } from '../../../shared/utility';
import classes from './NewSkill.css';



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

    goBackHandler = () => {
        this.props.history.goBack();
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

        let errorMsgDefault = 'Could not send empty string';
        let errorNameDefault = 'null';

        if (this.props.error.op) {
            errorMsgDefault = this.props.error.errmsg;
            errorNameDefault = this.props.error.op.name;
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

                {this.props.status === 200 ? 
                    <div className={classes.Success}>
                        <p>Successfully created new skill: {this.props.response.name}</p>
                        <p>You can countinue adding new skills or go back to job posting page</p>
                    </div>
                     : null}

                {this.props.status === 400 ? 
                    <div className={classes.Fail}>
                        <p>Was unable to create: {errorNameDefault}</p>
                        <p>{errorMsgDefault}</p>
                    </div> : null}

                <Button 
                    btnType="Success"
                    clicked={this.postSkillHandler}>post</Button>
                <Button
                    btnType="Danger"
                    clicked={this.goBackHandler}>go back</Button>
            </Aux>
        );
    };
}


const mapStateToProps = state => {
    return {
        skills: state.skill.skills,
        error: state.skill.error,
        response: state.skill.response,
        status: state.skill.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitSkills: () => dispatch(actions.initSkills()),
        postSkill: (state) => dispatch(actions.postSkill(state)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewSkill));
