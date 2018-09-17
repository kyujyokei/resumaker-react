import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import ExpsContainer from './ExpsContainer/ExpsContainer';
import NavigationHeader from '../../components/Navigation/NavigationHeader';
import { Route, Switch, Redirect} from 'react-router-dom';
import PersonalInfoContainer from './PersonalInfoContainer/PersonalInfoContainer';
import SignUp from './SignUp/SignUp';
import MyResumes from './MyResumes/MyResumes';
import classes from './MyPage.css';
import NewExpJob from './NewExp/NewExpJob/NewExpJob';
import PersonalInfoForm from './PersonalInfoContainer/PersonalInfoForm/PersonalInfoForm';
import Logout from './SignUp/Logout/Logout';
import CoverPage from './CoverPage/CoverPage';

class MyPage extends Component {
    render () {
        return (
            <Aux>
                <div className={classes.MyPage}>
                <NavigationHeader 
                    isAuth={this.props.isAuthenticated}/>
                <div className={classes.Contents}>
                    <Switch>
                        <Route path="/me" exact component={PersonalInfoContainer}/>
                        <Route path="/exps" component={ExpsContainer}/>
                        <Route path="/signup" component={SignUp} />
                        <Route path="/resume" component={MyResumes} />
                        <Route path="/job/new" exact component={NewExpJob} />
                        <Route path="/me/edit" exact component={PersonalInfoForm} />
                        <Route path="/logout" component={Logout}/>
                        <Route path="/" exact component={CoverPage} />


                    </Switch>
                </div>
                {/* <ExpsContainer /> */}
                </div>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps) (MyPage);