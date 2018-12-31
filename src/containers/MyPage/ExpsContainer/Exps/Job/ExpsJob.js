import React, { Component } from 'react';
import Job from '../../../../../components/Exp/Job/Job';
import classes from './ExpsJob.css'
import { Route, Link } from 'react-router-dom';
import FullExpJob from '../../../FullExp/FullExpJob/FullExpJob';
import axios from '../../../../../axios';
import Button from '../../../../../components/UI/Button/Button';
import LoadingAnimation from '../../../../../components/UI/LoadingAnimation/LoadingAnimation';


class ExpsJob extends Component {
    
    
    state = {
        jobs: [],
        jobSelected: null,
        loading: true
    }

    componentDidMount () {
        axios.get( '/jobs/me', { headers: { "x-auth":  localStorage.getItem("token")}}) // this is from https://jsonplaceholder.typicode.com/posts
            .then( response => {
                const jobs = response.data.jobs;
                const updatedJobs = jobs.map( job => {
                    return {
                        ...job // can edit each post here
                    }
                });
                this.setState( { jobs: updatedJobs } );
                this.setState({loading: false});
            }).catch( error => {
                console.log( error );
            });
    }

    jobSelectHandler = ( id ) => {
        // console.log("Match: ",this.props.match.url);
        // console.log("History: ",this.props.history);
        this.props.history.push( '/exps/job/' + id );
        this.setState( { jobSelected: id } )
        // console.log("Match: ",this.props.match.url);
        // console.log("History: ",this.props.history);
    }


    render() {

        let jobs = <p>The place for jobs</p>;
        
        if ( !this.state.error ){
            if ( !this.state.jobSelected ) {
                jobs = this.state.jobs.map( job => {
                    // console.log("JOB: ", job);
                    return (
                        <Job
                        key={job._id}
                        title={job.position}
                        company={job.companyName}
                        location={job.location}
                        endDate={new Date(job.endDate).toISOString().split('T')[0]}
                        startedDate={new Date(job.startedDate).toISOString().split('T')[0]}
                        descriptions={job.descriptions}
                        clicked={() => this.jobSelectHandler( job._id )} />
                    );
                });
            } 
        } else {
            console.log(this.state.error);
        }

        return (
                  
            <div >
    
                <h3>JOB / PROJECTS</h3>
                <Link to='/job/new'>
                    <Button btnType="BlueRounded">+ NEW</Button>
                </Link>
                {this.state.loading ? <LoadingAnimation/> : null}  
                <section className={classes.Exps}>
                    {jobs}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullExpJob} />
            </div>
        );
    }
}

export default ExpsJob;