import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Exps from './Exps/Exps';
import NavigationHeader from '../../components/Navigation/NavigationHeader';

class MyPage extends Component {
    render () {
        return (
            <Aux>
                <NavigationHeader />
                <Exps />
            </Aux>
        );
    }
};

export default MyPage;