import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import ExpsContainer from './ExpsContainer/ExpsContainer';
import NavigationHeader from '../../components/Navigation/NavigationHeader';
import { Route, Switch, Redirect} from 'react-router-dom';
import PersonalInfoContainer from './PersonalInfoContainer/PersonalInfoContainer';
import SignUp from './SignUp/SignUp';

class MyPage extends Component {
    render () {
        return (
            <Aux>
                <NavigationHeader />
                <Switch>
                    <Route path="/me" exact component={PersonalInfoContainer}/>
                    <Route path="/exps" component={ExpsContainer}/>
                    <Route path="/signup" component={SignUp} />
                </Switch>
                {/* <ExpsContainer /> */}
            </Aux>
        );
    }
};

export default MyPage;