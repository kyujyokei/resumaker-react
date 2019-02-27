import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import ExpsContainer from './ExpsContainer/ExpsContainer';
import NavigationHeader from '../../components/Navigation/NavigationHeader';
import { Route, Switch, withRouter} from 'react-router-dom';
import ProfileContainer from './ProfileContainer/ProfileContainer';
import SignUp from './SignUp/SignUp';
import MyResumes from './MyResumes/MyResumes';
import classes from './MyPage.css';
import NewExpJob from './NewExp/NewExpJob/NewExpJob';
import NewExpSchool from './NewExp/NewExpSchool/NewExpSchool';
import ProfileForm from './ProfileContainer/ProfileForm/ProfileForm';
import Logout from './SignUp/Logout/Logout';
import CoverPage from './CoverPage/CoverPage';
import NewSkill from './NewSkill/NewSkill';
import Footer from '../../components/Footer/Footer';


class MyPage extends Component {
    
    render () {
        let shouldRedirect = null;
        let path = this.props.location.pathname;
        return (
            <Aux>
                <div className={classes.MyPage}>
                {path === "/" ? null : <NavigationHeader bgType={"White"}/>}
                
                <div className={classes.Contents}>
                    {shouldRedirect}
                    <Switch>
                        <Route path="/me" exact component={ProfileContainer}/>
                        <Route path="/exps/job/edit/:id" exact component={NewExpJob} />
                        <Route path="/exps" component={ExpsContainer}/>
                        <Route path="/signup" component={SignUp} />
                        <Route path="/resume" component={MyResumes} />
                        <Route path="/job/new" exact component={NewExpJob} />
                        <Route path="/school/new" exact component={NewExpSchool} />
                        <Route path="/me/edit" exact component={ProfileForm} />
                        <Route path="/logout" component={Logout}/>
                        <Route path="/newskill" component={NewSkill} />
                        <Route path="/" exact component={CoverPage} />
                    </Switch>
                    {/* {this.props.isAuthenticated ? null : <Redirect to="/"/>} */}
                </div>
                {/* <ExpsContainer /> */}
                </div>
                <Footer/>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default withRouter(connect(mapStateToProps) (MyPage));