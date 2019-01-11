import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../components/UI/Button/Button';
import classes from './Tutorial.css';

class DeleteConfirm extends Component {

    state = {
        currPage: 1,
        totalPage: this.props.totalPage
    }

    flipRightHandler = () => {
        let currentPage = this.state.currPage;
        if (currentPage < this.state.totalPage) {
            this.setState({currPage: currentPage + 1});
        }

    }

    flipLeftHandler = () => {
        let currentPage = this.state.currPage;
        if (currentPage > 1) {
            this.setState({currPage: currentPage - 1});
        }
    }



    render () {
        return (
            <Aux className={classes.Tutorial}>
                <Button btnType="Arrow" clicked={this.flipRightHandler}>➡</Button>
                <div>
                    <div>
                        {this.props.children[this.state.currPage - 1]}
                    </div>
                    <div>
                        <p>{this.state.currPage} / {this.state.totalPage}</p>
                    </div>
                </div>
                
                
                <Button btnType="Arrow" clicked={this.flipLeftHandler}>⬅</Button>
            </Aux>
        );
    }
}

export default DeleteConfirm;