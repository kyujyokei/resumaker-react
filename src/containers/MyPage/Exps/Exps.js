import React, { Component } from 'react';
import Job from '../../../components/Exp/Job/Job';
import classes from './Exps.css'
import Aux from '../../../hoc/Aux';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import FullExpJob from '../FullExp/FullExpJob/FullExpJob';

class Exps extends Component {

    state = {
        expSelected: false
    }

    render() {
        return (

            <Aux>
                <Switch>
                {this.state.expSelected ? <Route path="/new-post" component={FullExpJob} /> : null}
                <Route path="/" component={
                    
                    <Aux>
                        <div className={classes.Exps}>
                            <h3 className={classes.Title}>JOB EXPERIENCES</h3>
                            <Job title="A" date="2018" description="bubui"/>
                            <Job title="A" date="2018" description="bubui"/>
                            <Job title="A" date="2018" description="bubui"/>
                        </div>
                        <div className={classes.Exps}>
                            <h3 className={classes.Title}>PROJECT EXPERIENCES</h3>
                            <Job title="A" date="2018" description="bubui"/>
                            <Job title="A" date="2018" description="bubui"/>
                            <Job title="A" date="2018" description="bubui"/>
                        </div>
                        <div className={classes.Exps}>
                            <h3 className={classes.Title}>EDUCATION</h3>
                            <Job title="A" date="2018" description="bubui"/>
                            <Job title="A" date="2018" description="bubui"/>
                            <Job title="A" date="2018" description="bubui"/>
                        </div>
                    </Aux>


                } />
                
                <Redirect from="/" to="/posts" />
                {/* <Route path="/" component={Posts} /> */}
                </Switch>

                
            </Aux>
        );
    }
}

export default Exps;