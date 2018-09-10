import React, {Component} from 'react';
import Aux from '../../../../hoc/Aux';

class PersonalInfoDetail extends Component {
    render () {
        return (
            <Aux>
                <div>
                    <p>Name: Kejo Hsieh</p>
                    <p>Phone: 6267660549</p>
                    <p>Address: 3276 NW Orchard Ave Corvallis OR 97330</p>
                    <p>Email: hsiehke@oregonstate.edu</p>
                    <p>Github Link: https://github.io/kyujyokei</p>
                </div>
            </Aux>
        )
    }
}

export default PersonalInfoDetail;