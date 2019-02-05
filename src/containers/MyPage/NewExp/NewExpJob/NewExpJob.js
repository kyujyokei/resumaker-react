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
// import Tutorial from  '../../ExpsContainer/Tutorial/Tutorial';
// import Modal from '../../../../components/UI/Modal/Modal';
import ReactJoyride, { STATUS } from 'react-joyride';

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
            location: {
                title: 'Location',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ex. Oregon, U.S.'
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
        descriptions: [],
        descriptionFormIsValid: false,
        showTutorial: false,
        steps: [
            {
                content: <h3>This is the page where you can enter you job experience</h3>,
                placement: 'center',
                locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
                target: 'body',
            },
            {
                content: 'First, enter the basic information is this section',
                placement: 'bottom',
                styles: {
                    options: {
                    width: 300
                    }
                },
                target: '.basic__form'
            },
            {
                content: 'Second, enter the skills involved or acheivements accomplished in the description details, just like how you would make bullet points in your resume',
                placement: 'right',
                target: '.des__form'
            },
            {
                content: <div><p>You will want to add skill tags for your descriptions which involves specific technical skills</p>
                        <p>For example, if my description is "Implemented frontend with React and backend with Node.js", then make sure to tag "React" and "Node.js" along this description.</p>
                        <p>Remember, this will be the determining factor of whether this experience is going to show up in the generated resume.</p>
                        <p>For accomplishments that does not involve specific skills (e.g. Managed a dev team of 10 people), simply leave the skill tag area blank</p></div>,
                target: '.skill__input',
                styles: {
                    options: {
                    width: 600
                    }
                },
            }
        ],
        run: false
    }

    componentWillMount () {

        // console.log("new props: ", this.props);
        // console.log("new props.companyLocation: ", this.props.companyLocation);
        
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
                    location: {
                        ...this.state.info.location,
                        value: this.props.companyLocation,
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


            let descriptionArr = [];
            this.props.descriptions.map((des, idx) => {

                let selectArr = [];
                des.skills.map((element) => {

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

                descriptionArr.push(d);

                // NOTE: can't use object update because description is supposed to be an array, not an object
                //       this is important since the latter part uses .map() which is looping through arrays
                // let newDescriptions = updateObject(this.state.descriptions, {
                //     [idx]: d
                // })


                this.setState({ descriptions: descriptionArr })
                
                
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

            this.props.postJob( this.state, false, null );
        } else { //patch

            this.props.postJob( this.state, true, this.props.patchId);
        }
       
    }

    toggleTutorialHandler = () => {
        let current = this.state.showTutorial;
        this.setState({showTutorial: !current});
    }

    handleJoyrideCallback = data => {
        const { status, type } = data;
    
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          this.setState({ run: false });
        }
    
        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };

    handleClickStart = e => {
        e.preventDefault();
    
        this.setState({
          run: true
        });
    };

    render () {
        console.log('this.state.info: ', this.state.info);
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
            <form className="basic__form">
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
            <form className="des__form">
            <h3>Descriptions</h3>
            {this.state.descriptions.map((description, index) => {
                
                let select = null;

                select = <div className='skill__input'><Select  
                className={classes.Select} 
                options={skillsList} 
                placeholder="Select skills"
                isMulti={true}
                value={this.state.descriptions[index].skills}
                onChange={(opt) => this.selectChangeHandler(opt, index)}/></div>

                
                return (
                    <div key={index}>
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
        this.props.resetStatus();

        if (this.props.status === 200) {
            // console.log("POST ID: ", this.props.response)
            if ( !this.props.position && this.props.response._id ){
                let path = "/exps/job/" + this.props.response._id;
            jobRedirect = <Redirect to={path} />  
            } else {
                window.location.reload();
            }
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>
            console.log(this.props.error);
        }

        // let tutorialArray = [<div>
        //                         <p>In this page, you can input your job experience for 1 specific job.</p>
        //                         <p>Make sure to put the basic info listed in the form.</p>
        //                         <p>These will be the essential fundementals towards creating your resume,</p>
        //                         <p>so make sure you only put what you wanted to show!</p>
        //                     </div>,
        //                     <div>
        //                         <img src={window.location.origin + "/tutorials/new_job_skills_tags.png"} />
        //                         <p>In the description section, enter the accomplishments in a bullet point format.</p>
        //                         <p>You can add skill tags to the description, these will be used to identify if this is a job or acheivement worth mentioning when we build your resume, so be specific and pick your tags wisely!</p>
        //                         <img src={window.location.origin + "/tutorials/new_job_no_skill.png"} />
        //                         <p>The description without skill tags will always be included in this job experience. This is useful for accomplishments that does not involve any skill.</p>
        //                     </div>,
        //                     <div>
        //                         <img src={window.location.origin + "/tutorials/new_job_add_des.png"} />
        //                         <p>You can also add or remove descriptions all you want.</p>
        //                     </div>
        //                     ];
        // let tutorialArray = [tutorialPage1];
        // let pages = tutorialArray.length;
        // let tutorials = <Tutorial
        //                     totalPage={pages}>
        //                     {tutorialArray}</Tutorial>;

        
        return (
            
            <div className={classes.NewExpJob}>
            <ReactJoyride
                    callback={this.handleJoyrideCallback}
                    continuous
                    run={this.state.run}
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    steps={this.state.steps}
                    styles={{
                        options: {
                        zIndex: 10000,
                        }
                    }}
                    />
            {this.props.position ? <h2 className={classes.Head}>Edit job / project</h2> : <h2 className={classes.Head}>Create new job / project</h2> }
                <Button btnType="Help" clicked={this.handleClickStart}>? Help</Button>
                {/* <Modal show={this.state.showTutorial} modalClosed={this.toggleTutorialHandler}>
                    {tutorials}
                </Modal> */}
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
                </Link> (which will make you lose all progress, save before you do this!)</p>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skills: state.skill.skills,
        error: state.job.error,
        status: state.job.status,
        loading: state.job.loading,
        response: state.job.response
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