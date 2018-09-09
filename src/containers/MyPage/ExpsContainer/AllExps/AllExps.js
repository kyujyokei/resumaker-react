import React, { Component } from 'react';
import ExpsJob from '../Exps/Job/ExpsJob';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Aux from '../../../../hoc/Aux';

class AllExps extends Component {
    render () {
        console.log("ALL exps: " , this.props);
        return (
            <Aux>
                <Route path='' exact component={ExpsJob} />
                <Route path='' exact component={ExpsJob} />
                <Route path='' exact component={ExpsJob} />
            </Aux>
        );
    }
}

export default AllExps;