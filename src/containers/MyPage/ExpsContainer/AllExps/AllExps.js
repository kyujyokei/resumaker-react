import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';

class AllExps extends Component {
    render () {
        return (
            <Aux>
                <Route path={this.props.match.url} component={ExpsJob} />
                <Route path={this.props.match.url} component={ExpsJob} />
                <Route path={this.props.match.url} component={ExpsJob} />
            </Aux>
        );
    }
}

export default AllExps;