import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

class AllExps extends Component {
    render () {
        console.log("ALL exps: " , this.props);
        return (
            <Route path={this.props.match.url + ''} exact component={ExpsJob} />
        );
    }
}

export default AllExps;