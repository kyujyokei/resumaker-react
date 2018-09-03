import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import FullExpJob from '../FullExp/FullExpJob/FullExpJob';
import AllExps from '../ExpsContainer/AllExps/AllExps';
import ExpsJob from './Exps/Job/ExpsJob';

class ExpsContainer extends Component {

    state = {
        expSelected: false
    }

    render () {

        return (
            <Aux>
                <Switch>
                {/* {this.state.expSelected ? <Route path="/post" component={FullExpJob} /> : null} */}
                <Route path="/" exact component={AllExps}/>
                <Route path="/:id" component={FullExpJob}/>
                {/* <Redirect from="/" to="/" /> */}
                </Switch>
            </Aux>

        );
    }

    
}

export default ExpsContainer;