import React, { Component } from 'react';
import classes from './FullExpJob.css';
import axios from '../../../../axios';
import LoadingAnimation from '../../../../components/UI/LoadingAnimation/LoadingAnimation';
// import Button from '../../../../components/UI/Button/Button';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Tags from '../../../../components/Tags/Tags';
import Tag from '../../../../components/UI/Tag/Tag';

import NewExpJob from '../../NewExp/NewExpJob/NewExpJob';



class FullExpJob extends Component {
    
    state = {
        loadedPost: null,
        redirect: false,
        isPatch: false
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {

                this.props.getJob( this.props.match.params.id );
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/jobs/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({redirect: true});
                    
                }
            });

    }

    editPostHandler = () => {
        // console.log("Match: ",this.props.match.url);
        // console.log("History: ",this.props.history);
        this.props.resetState();
        this.props.enablePatch();
        // this.props.history.push( '/exps/job/edit/' + this.props.match.params.id );
        // console.log("History after: ",this.props.history);
    }

    render () {
        // console.log("JOB:", this.props.job);
        let post = null;
        
        if ( this.props.match.params.id ) {
            post = <LoadingAnimation />;
        }
        if ( this.props.job ) {
            // console.log(this.state.loadedPost);
            
            var descriptions = this.props.job.descriptions.map((d, index) => {
                var skillNames = d.skills.map((s, index) => {
                    return <Tag key={index}>{s.skillName}</Tag>
                    // console.log("S: ",s, d);
                })
                return (
                    <div key={index} className={classes.Description}>
                        <li>{d.description}</li>
                        <Tags>
                            {skillNames}
                        </Tags>
                    </div>)
            });

            let shouldRedirect = null;
            if (this.state.redirect) {
                shouldRedirect = <Redirect to="/exps/"/>
            }

            if (!this.props.isPatch){
                post = (
                    <div className={classes.FullExpJob}>
                        {shouldRedirect}
                        <h1>{this.props.job.position}</h1>
                        <h3>{this.props.job.companyName}</h3>
                        <p>Start: {new Date(this.props.job.startedDate).toISOString().split('T')[0]}</p>
                        <p>End: {new Date(this.props.job.endDate).toISOString().split('T')[0]}</p>
                        <h3>Descriptions</h3>
                        {descriptions}
                        <div>
                            <button onClick={this.editPostHandler} className={classes.Buttons}>Edit</button>
                            <button onClick={this.deletePostHandler} className={classes.Buttons}>Delete</button>
                        </div>
                        <Route path={this.props.match.url + '/edit/:id'} exact component={FullExpJob} />
                    </div>

                );
            } else {
                post = <NewExpJob
                    patch="patch mode"
                    patchMode={true}
                    // patchJob={this.props.job}
                    position={this.props.job.position}
                    companyName={this.props.job.companyName}
                    startedDate={new Date(this.props.job.startedDate).toISOString().split('T')[0]}
                    endDate={new Date(this.props.job.endDate).toISOString().split('T')[0]}
                    descriptions={this.props.job.descriptions}
                    patchId={this.props.match.params.id }/>;   
            }
        }
        return post;
    }

}

const mapStateToProps = state => {
    return {
        job: state.job.job,
        error: state.job.error,
        status: state.job.status,
        loading: state.job.loading,
        isPatch: state.job.isPatch // TODO: refresh causes isPatch set to false, might want to find better ways to determine this
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getJob: (id) => dispatch(actions.getJobById(id)),
        enablePatch: () => dispatch(actions.enablePatch()),
        resetState: () => dispatch(actions.jobStateReset())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (FullExpJob));