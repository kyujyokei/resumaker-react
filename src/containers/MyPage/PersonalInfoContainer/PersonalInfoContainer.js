import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import PersonalInfoForm from './PersonalInfoForm/PersonalInfoForm';
import PersonalInfoDetail from './PersonalInfoDetail/PersonalInfoDetail';

class PersonalInfoContainer extends Component {
    componentDidMount () {
        console.log("PI container: ", this.props);
    }

    render () {
        return (
            <Aux>
                <Link to={this.props.match.url + '/edit' }>EDIT</Link>
                <Switch>
                        <Route path={this.props.match.url + '/edit'} component={PersonalInfoForm}/>
                        <Route path={this.props.match.url} component={PersonalInfoDetail}/>
                        
                </Switch>
            </Aux>
        )
    }
}

export default PersonalInfoContainer;