import React, { Component } from 'react';
import classes from './NewExpJob.css';
import Select from 'react-select';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import * as actions from '../../../../store/actions/index';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../../../hoc/Aux';
import { updateObject, checkValidity } from '../../../../shared/utility';


class NewExpJob extends Component {

    state = {
        info: {
            position: {
                title: 'Position',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. Product Manager'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            companyName: {
                title: 'Company Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. Example Inc.'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            startedDate: {
                title: 'Start Date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Start date'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            endDate: {
                title: 'End Date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'End Date'
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
        //     {
        //     elementType: 'input',
        //     elementConfig: {
        //         type: 'text',
        //         placeholder: 'Enter your accomplishments here'
        //     },
        //     value: '',
        //     validation: {
        //         required: true
        //     },
        //     valid: false,
        //     touched: false,
        //     skills: ''    
        // }
        ],
        descriptionFormIsValid: false
    }

    componentWillMount () {

        
        this.props.onInitSkills();

        if (this.props.position){ // patch mode
            this.setState({
                info: {
                    ...this.state.info,
                    position: {
                        ...this.state.info.position,
                        value: this.props.position,
                        valid: true,
                        touched: true,

                    },
                    companyName: {
                        ...this.state.info.companyName,
                        value: this.props.companyName,
                        valid: true,
                        touched: true,
                    },
                    startedDate: {
                        ...this.state.info.startedDate,
                        value: this.props.startedDate,
                        valid: true,
                        touched: true,
                    },
                    endDate: {
                        ...this.state.info.endDate,
                        value: this.props.endDate,
                        valid: true,
                        touched: true,
                    }
                }
            });


            
            this.props.descriptions.map((des, idx) => {
                console.log("idx: ", idx, des);
                let selectArr = [];
                des.skills.map((element) => {
                    console.log("element: ", element)
                    selectArr.push({value: element.skillId, label: element.skillName});
                });
                var d = {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter your accomplishments here'
                    },
                    value: des.description,
                    validation: {
                        required: true,
                    },
                    valid: true,
                    touched: true,
                    skills: selectArr 
                };
        
                let newDescriptions = [
                    ...this.state.descriptions,
                    d
                ]

                // NOTE: can't use object update because description is supposed to be an array, not an object
                //       this is important since the latter part uses .map() which is looping through arrays
                // let newDescriptions = updateObject(this.state.descriptions, {
                //     [idx]: d
                // })

                console.log('this.state.descriptions: ',this.state.descriptions)

                this.setState({ descriptions: newDescriptions})
                
                
            })
            
            
        } else {
            this.setState({
                descriptions: [
                        {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Enter your accomplishments here'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false,
                        skills: ''    
                }]
            })
        }
    }


    pushDescription = () => {
        var d = {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your accomplishments here'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            skills:[]  
        };

        let newDescriptions = [
            ...this.state.descriptions,
            d
        ]

        this.setState({ descriptions: newDescriptions})
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
    }

    descriptionInputChangedHandler = (event, index) => {
        const updatedDescriptions = [
            ...this.state.descriptions
        ];

        const updatedDescriptionElement = {
            ...updatedDescriptions[index]
        };
        updatedDescriptionElement.value = event.target.value;
        updatedDescriptionElement.valid = checkValidity(updatedDescriptionElement.value, updatedDescriptionElement.validation);
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

        const updatedDescriptions = [
            ...this.state.descriptions
        ];
        updatedDescriptions.splice(index,1);
        this.setState({description: this.state.descriptions.splice(index, 1)});

    }

    selectChangeHandler = (opt, index) => {
        const updatedDescriptions = [
            ...this.state.descriptions
        ];

        var updatedDescriptionElement = JSON.parse(JSON.stringify(updatedDescriptions[index]));
        updatedDescriptionElement.skills = opt;
        updatedDescriptions[index] = updatedDescriptionElement;

        this.setState({descriptions: updatedDescriptions})

    }

    submitHandler = (event) => {
        event.preventDefault(); // stops the page from refreshing
        if ( ! this.props.patch) { // not patch
            // console.log('is not patch, new');
            this.props.postJob( this.state, false, null );
        } else { //patch
            // console.log('is patch, new');
            this.props.postJob( this.state, true, this.props.patchId);
        }
       
    }

    render () {
        console.log('this.state.descriptions: ', this.state.descriptions);
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
                {formElementsArray.map(formElement => {
                    return (
                        <div key={formElement.id} className={classes.InfoRow}>
                            <p className={classes.Title}>{formElement.config.title}</p>
                            <Input
                                className={classes.Inputs}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        </div>
                    )
                })}
            </form>
        );


        let descriptionsForm = (
            <Aux>
            <form>
            <h3>Descriptions</h3>
            {this.state.descriptions.map((description, index) => {
                
                let select = null;

                select = <Select  
                className={classes.Select} 
                options={skillsList} 
                placeholder="Select skills"
                isMulti={true}
                value={this.state.descriptions[index].skills}
                onChange={(opt) => this.selectChangeHandler(opt, index)}/>

                
                return (
                    <div key={index} >
                <p className={classes.DesNum}>{index+1}.</p>
                <Input
                    className={classes.Inputs}
                    elementType={description.elementType}
                    elementConfig={description.elementConfig}
                    value={description.value}
                    invalid={!description.valid}
                    shouldValidate={description.validation}
                    touched={description.touched}
                    changed={(event) => this.descriptionInputChangedHandler(event, index)}
                    />
                {select}
                {this.state.descriptions.length > 1 ? <Button btnType={"Danger"} clicked={(event) => this.deleteDescriptionHandler(event, index)}>X</Button> : null}
                </div>
                )
                
            })}
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

        let jobRedirect = null;
        if (this.props.status == 200) {
            jobRedirect = <Redirect to="/exps/" />
            this.props.resetStatus();
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>
            console.log(this.props.error);
        }
        return (
            
            <div className={classes.NewExpJob}>
            <h1>{this.props.patchId}</h1>
                {jobRedirect}
                {errorMessage}
                {form}
                {descriptionsForm}


                <Button 
                    btnType="Success" 
                    disabled={!this.state.formIsValid}
                    clicked={this.submitHandler} > save </Button>
                {/* <Select options={skillsList} /> */}
                <p>Didn't find the skill tag? Add new ones from <Link to="/newskill">
                    here
                </Link></p>
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        skills: state.skill.skills,
        error: state.job.error,
        status: state.job.status,
        loading: state.job.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitSkills: () => dispatch(actions.initSkills()),
        postJob: ( state, isPatch, id ) => dispatch(actions.postJob(state, isPatch, id)),
        resetStatus: () => dispatch(actions.jobStateReset())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewExpJob));