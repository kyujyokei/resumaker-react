import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';

class DeleteConfirm extends Component {
    render () {
        return (
            <Aux>
                <p>Are you sure you want to delete?</p>
                <Button btnType="Danger" clicked={this.props.delete}>delete</Button>
                <Button btnType="Success" clicked={this.props.cancel}>cancel</Button>
            </Aux>
        );
    }
}

export default DeleteConfirm;