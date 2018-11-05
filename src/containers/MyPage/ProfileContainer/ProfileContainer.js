import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import * as actions from '../../../store/actions/index';

class ProfileContainer extends Component {
    componentDidMount () {
        this.props.onInitProfile();
        // console.log
    }

    render () {
        return (
            <Aux>
                <Link to={this.props.match.url + '/edit' }>EDIT</Link>
                {/* <Switch>
                        <Route path={this.props.match.url} component={ProfileDetail}/>
                </Switch> */}
                <ProfileDetail
                    f_name={this.props.profile.f_name}
                    l_name={this.props.profile.l_name}
                    phone={this.props.profile.phone}
                    address={this.props.profile.address}
                    email={this.props.profile.email}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        error: state.profile.error,
        loading: state.profile.loading,
        status: state.profile.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProfile: () => dispatch(actions.initProfile())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));