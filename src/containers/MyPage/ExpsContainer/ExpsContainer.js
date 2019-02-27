import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import FullExpJob from '../FullExp/FullExpJob/FullExpJob';
import FullExpSchool from '../FullExp/FullExpSchool/FullExpSchool';
import AllExps from '../ExpsContainer/AllExps/AllExps';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
// import classes from './ExpsContainer.css';

class ExpsContainer extends Component {

    state = {
        expSelected: false
    }
     componentDidMount() {
         this.props.resetSchoolState();
         this.props.resetState();
     }

    render () {
        return (
            <Aux>
                <Switch>
                {/* {this.state.expSelected ? <Route path="/post" component={FullExpJob} /> : null} */}
                {/* <Route path="/me" component={Profile}/> */}
                <Route path={this.props.match.url + '/job/:id'} exact component={FullExpJob}/>
                <Route path={this.props.match.url + '/school/:id'} exact component={FullExpSchool}/>
                <Route path={this.props.match.url} exact component={AllExps}/>
                
                {/* <Redirect from="/" to="/" /> */}
                </Switch>
            </Aux>

        );
    }

    
}

const mapStateToProps = state => {
    return {
        // school: state.school.school,
        // error: state.school.error,
        // status: state.school.status,
        // loading: state.school.loading,
        // isPatch: state.school.isPatch // TODO: refresh causes isPatch set to false, might want to find better ways to determine this
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.jobStateReset()),
        resetSchoolState: () => dispatch(actions.schoolStateReset())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ExpsContainer));