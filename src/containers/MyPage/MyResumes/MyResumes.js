import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './MyResumes.css'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



class MyResumes extends Component {

    state = {
        url: null,
        valid: false
    }

    postBtnHandler = () => {
        this.props.postRes(this.state.url);
    }

    inputChangedHandler = (event) => {
        this.setState({url: event.target.value});
        console.log(this.state.url);
    }

    render () {
        let scrapedData = this.props.data;
        let jobsForDisplay = [];
        console.log("scraped data: ", scrapedData);
        if (scrapedData){
            for (var i in scrapedData){
                jobsForDisplay.push(<div key={i}>
                    <h3>{scrapedData[i].position}</h3>
                    <p>{scrapedData[i].companyName}</p>
                </div>);
            }
        }



        return (
            <Aux>
                <p>Paste job description url: </p>
                <Input 
                    className={classes.JobLink} 
                    changed={(event) => this.inputChangedHandler(event)}
                    ></Input>
                <Button btnType="BlueRounded" clicked={this.postBtnHandler}>Generate</Button>
                <br/>
                {jobsForDisplay}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.resume.error,
        status: state.resume.status,
        loading: state.resume.loading,
        data: state.resume.data

    }
}

const mapDispatchToProps = dispatch => {
    return {
        postRes: ( url ) => dispatch(actions.postRes(url)),
        resetState: () => dispatch(actions.resPostReset)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (MyResumes));