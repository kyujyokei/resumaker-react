import React, {Component} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import PersonalInfoForm from './PersonalInfoForm/PersonalInfoForm';
import PersonalInfoDetail from './PersonalInfoDetail/PersonalInfoDetail';

class PersonalInfoContainer extends Component {
    componentDidMount () {
        console.log(this.state);
    }

    render () {
        return (
            <Aux>
                <NavLink to={this.props.match.url + '/edit' }>EDIT</NavLink>
                <Switch>
                        <Route path={this.props.match.url} component={PersonalInfoDetail}/>
                        <Route path={this.props.match.url + '/edit'} component={PersonalInfoForm}/>
                </Switch>
            </Aux>
        )
    }
}

export default PersonalInfoContainer;