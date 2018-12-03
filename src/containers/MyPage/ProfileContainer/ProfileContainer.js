import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button'
import LoadingAnimation from '../../../components/UI/LoadingAnimation/LoadingAnimation';

class ProfileContainer extends Component {

    state = {
        isEdit: false
    }

    componentDidMount () {
        this.props.onInitProfile();
        // console.log
    }

    editButtonHandler = () => {
        this.setState(prevState => {
            return {isEdit: !prevState.isEdit};
        });
    }

    render () {
        let content = null;
        if (!this.state.isEdit) {
            content = <ProfileDetail
                f_name={this.props.profile.f_name}
                l_name={this.props.profile.l_name}
                phone={this.props.profile.phone}
                address={this.props.profile.address}
                email={this.props.profile.email}/>
        } else {

            content = <ProfileForm>{this.props.profile}</ProfileForm>

        }




        return (
            <Aux>
                {/* <Link to={this.props.match.url + '/edit' }>EDIT</Link> */}
                {this.state.isEdit ? <Button clicked={this.editButtonHandler} btnType="Danger">Cancel</Button> : <Button clicked={this.editButtonHandler} btnType="BlueRounded">EDIT</Button>}
                {content}
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