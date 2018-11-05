import React, {Component} from 'react';
import Aux from '../../../../hoc/Aux';

class ProfileDetail extends Component {
    render () {
        return (
            <Aux>
                <div>
                    <p>{this.props.f_name} {this.props.l_name}</p>
                    <p>Phone: {this.props.phone}</p>
                    <p>Address: {this.props.address}</p>
                    <p>Email: {this.props.email}</p>
                    {/* <p>Github Link: https://github.io/kyujyokei</p> */}
                </div>
            </Aux>
        )
    }
}

export default ProfileDetail;