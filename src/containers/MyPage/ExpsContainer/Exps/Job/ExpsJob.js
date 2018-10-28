import React, { Component } from 'react';
import Job from '../../../../../components/Exp/Job/Job';
import classes from './ExpsJob.css'
import Aux from '../../../../../hoc/Aux';
import { Route, NavLink, Switch, Redirect, Link } from 'react-router-dom';
import FullExpJob from '../../../FullExp/FullExpJob/FullExpJob';
import axios from '../../../../../axios';
import Button from '../../../../../components/UI/Button/Button';
import NewExpJob from '../../../NewExp/NewExpJob/NewExpJob';

class ExpsJob extends Component {
    
    
    state = {
        jobs: [],
        jobSelected: null
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
            }).catch( error => {
                console.log( error );
            });
    }

    jobSelectHandler = ( id ) => {
        this.props.history.push( '/exps/job/' + id );
        this.setState( { jobSelected: id } )
    }


    render() {

        let jobs = <p>The place for jobs</p>;
        
        if ( !this.state.error ){
            if ( !this.state.jobSelected ) {
                jobs = this.state.jobs.map( job => {
                    return (
                        <Job
                        key={job._id}
                        title={job.position}
                        company={job.companyName}
                        date={"2018/1/1~2019/1/1"}
                        description={job.body}
                        clicked={() => this.jobSelectHandler( job._id )} />
                    );
                });
            } 
        } else {
            console.log(this.state.error);
        }

        return (
                    
            <div >
                <h3>JOB EXPERIENCE</h3>
                <Link to='/job/new'>
                    <Button btnType="BlueRounded">+ NEW</Button>
                </Link>
                <section className={classes.Exps}>
                    {jobs}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullExpJob} />
            </div>
        );
    }
}

export default ExpsJob;