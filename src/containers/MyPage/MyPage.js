import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import ExpsContainer from './ExpsContainer/ExpsContainer';
import NavigationHeader from '../../components/Navigation/NavigationHeader';

class MyPage extends Component {
    render () {
        return (
            <Aux>
                <NavigationHeader />
                <ExpsContainer />
            </Aux>
        );
    }
};

export default MyPage;