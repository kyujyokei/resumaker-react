import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button'
import LoadingAnimation from '../../../components/UI/LoadingAnimation/LoadingAnimation';
import ReactJoyride, { STATUS } from 'react-joyride';


class ProfileContainer extends Component {

    state = {
        isEdit: false,
        run: false,
        steps: [
            {
                content: 'This is the page where your personal profile is located',
                placement: 'center',
                title:<h3>Profile </h3>,
                locale: { skip: <strong aria-label="skip">SKIP</strong> },
                target: 'body',
            },
            {
                content: 'Simply click edit to change your personal information',
                placement: 'left',
                target: '.edit__button Button'
            },
            {
                content: 'Remember, this show up in your resume, so please make sure the information you\'ve provided is up to date!',
                placement: 'center',
                target:'body'
            },
        ]
    }

    componentDidMount () {
        this.props.onInitProfile();
        let tutorialShown = localStorage.getItem('profTutoShown');
        if (!tutorialShown) {
            this.setState({run: true});
            localStorage.setItem('profTutoShown', true);
        }
    }

    editButtonHandler = () => {
        this.setState(prevState => {
            return {isEdit: !prevState.isEdit};
        });
    }

    handleClickStart = e => {
        e.preventDefault();
    
        this.setState({
          run: true
        });
    };

    handleJoyrideCallback = data => {
        const { status, type } = data;
    
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          this.setState({ run: false });
        }

        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };

    

    render () {
        let content = null;
        if (!this.state.isEdit) {
            if (this.props.profile.f_name){
                content = <ProfileDetail
                f_name={this.props.profile.f_name}
                l_name={this.props.profile.l_name}
                phone={this.props.profile.phone}
                address={this.props.profile.address}
                email={this.props.profile.email}/>
            } else {
                content = <LoadingAnimation/>
            }
        } else {

            content = <ProfileForm>{this.props.profile}</ProfileForm>

        }




        return (
            <Aux>
                <ReactJoyride
                    callback={this.handleJoyrideCallback}
                    continuous
                    run={this.state.run}
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    steps={this.state.steps}
                    styles={{
                        options: {
                        zIndex: 10000,
                        }
                    }}
                    />
                <Button btnType="Help" clicked={this.handleClickStart}>? Help</Button>
                {content}
                <div className="edit__button">
                    {this.state.isEdit ? <Button clicked={this.editButtonHandler} btnType="Danger">cancel</Button> : <Button clicked={this.editButtonHandler} btnType="BlueRounded">EDIT</Button>}
                </div>
                
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        error: state.profile.error,
        loading: state.profile.loading,
        status: state.profile.status,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProfile: () => dispatch(actions.initProfile())
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));