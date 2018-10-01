import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
// import axios from '../../../axios';
import FullExpJob from '../FullExp/FullExpJob/FullExpJob';
import AllExps from '../ExpsContainer/AllExps/AllExps';
import NewExpJob from '../NewExp/NewExpJob/NewExpJob';

class ExpsContainer extends Component {

    state = {
        expSelected: false
    }

    render () {
        // console.log('EXP C: ', this.props);
        return (
            <Aux>
                <Switch>
                {/* {this.state.expSelected ? <Route path="/post" component={FullExpJob} /> : null} */}
                {/* <Route path="/me" component={PersonalInfo}/> */}
                <Route path={this.props.match.url + '/job/:id'} exact component={FullExpJob}/>
                <Route path={this.props.match.url} exact component={AllExps}/>
                
                {/* <Redirect from="/" to="/" /> */}
                </Switch>
            </Aux>

        );
    }

    
}

export default ExpsContainer;