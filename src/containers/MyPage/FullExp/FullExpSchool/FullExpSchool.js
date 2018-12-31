import React, { Component } from 'react';
import classes from './FullExpSchool.css';
import axios from '../../../../axios';
import LoadingAnimation from '../../../../components/UI/LoadingAnimation/LoadingAnimation';
// import Button from '../../../../components/UI/Button/Button';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NewExpSchool from '../../NewExp/NewExpSchool/NewExpSchool';
import Modal from '../../../../components/UI/Modal/Modal';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';
import Aux from '../../../../hoc/Aux';


class FullExpSchool extends Component {
    
    state = {
        loadedPost: null,
        redirect: false,
        isPatch: false,
        deleting: false
    }

    componentDidMount () {
        this.loadData();
    }


    loadData () {
        console.log("Bubui");
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                // axios.get( '/schools/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}} )
                //     .then( response => {
                //         console.log("R:", response);
                //         this.setState( { loadedPost: response.data } );
                //     } );
                this.props.getSchool( this.props.match.params.id );
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/schools/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({redirect: true});
                    
                }
            });

    }

    editPostHandler = () => {
        // axios.delete('/schools/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
        //     .then(response => {
        //         console.log(response);
        //     });
        this.props.resetState();
        this.setState({isPatch: true})
        // this.props.enablePatch();
    }

    deleteHandler = () => {
        this.setState({deleting: true});
    }

    deleteCancelHandler = () => {
        this.setState({deleting: false});
    }
      

    render () {
        console.log(this.state);
        let post = null;
        let deleteConfirmation = null;
        
        if ( this.props.match.params.id ) {
            post = <LoadingAnimation />;
        }
        if (this.props.school) {
            if (! this.state.isPatch){
                
                let shouldRedirect = null;
                if (this.state.redirect) {
                    shouldRedirect = <Redirect to="/exps/"/>
                }
                // console.log("SCHOOL: ", this.props.school);
                deleteConfirmation = <DeleteConfirm cancel={this.deleteCancelHandler} delete={this.deletePostHandler}/>
                post = (
                    <div className={classes.FullExpSchool}>
                        {shouldRedirect}
                        <h3>{this.props.school.major}</h3>
                        <h4>{this.props.school.schoolName}, {this.props.school.location}</h4>
                        
                        
                        <p>GPA: {this.props.school.gpa}</p>
                        <p>Start: {new Date(this.props.school.startedDate).toISOString().split('T')[0]}</p>
                        <p>End: {new Date(this.props.school.endDate).toISOString().split('T')[0]}</p>
                        <div >
                            <button onClick={this.editPostHandler} className={classes.Buttons}>Edit</button>
                            <button onClick={this.deleteHandler} className={classes.Buttons}>Delete</button>
                            
                        </div>
                    </div>

                );
                
            } else {
                // patch mode
                post = (
                    <NewExpSchool 
                        patch={true}
                        patchId={this.props.match.params.id}
                        patchSchool={this.props.school}/>
                );
            }
        }
        return (
            <Aux>
                <Modal show={this.state.deleting} modalClosed={this.deleteCancelHandler}>
                    {deleteConfirmation}
                </Modal>
                {post}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        school: state.school.school,
        error: state.school.error,
        status: state.school.status,
        loading: state.school.loading,
        isPatch: state.school.isPatch // TODO: refresh causes isPatch set to false, might want to find better ways to determine this
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSchool: (id) => dispatch(actions.getSchoolById(id)),
        enablePatch: () => dispatch(actions.enableSchoolPatch()),
        resetState: () => dispatch(actions.schoolStateReset())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (FullExpSchool));