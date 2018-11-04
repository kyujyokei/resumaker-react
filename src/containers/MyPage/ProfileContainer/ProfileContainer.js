import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileDetail from './ProfileDetail/ProfileDetail';

class ProfileContainer extends Component {
    componentDidMount () {

    }

    render () {
        return (
            <Aux>
                <Link to={this.props.match.url + '/edit' }>EDIT</Link>
                <Switch>
                        {/* <Route path={this.props.match.url + '/edit'} component={ProfileForm}/> */}
                        <Route path={this.props.match.url} component={ProfileDetail}/>
                        
                </Switch>
            </Aux>
        )
    }
}

export default ProfileContainer;