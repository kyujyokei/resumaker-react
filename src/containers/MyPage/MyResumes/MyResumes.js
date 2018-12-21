import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './MyResumes.css'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import school from '../../../components/Exp/School/School';
import { updateObject } from '../../../shared/utility';


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
        let schools = [];
        let jobsForDisplay = [];
        let profile = [];
        console.log("scraped data: ", scrapedData);
        if (scrapedData){
            let user = scrapedData.user;
            profile.push(
                <div key={user.email}>
                    <h1>{user.f_name} {user.l_name}</h1>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.address}</p>
                </div>
            );
            for (var i in scrapedData.schools){
                schools.push(
                    <div key={scrapedData.schools[i]._id}>
                        <h3>{scrapedData.schools[i].schoolName}</h3>
                        <h4>{scrapedData.schools[i].major}</h4>
                        <h4>GPA: {scrapedData.schools[i].gpa}</h4>
                        <p>Started: {scrapedData.schools[i].startedDate}</p>
                        <p>Graduate: {scrapedData.schools[i].endDate}</p>
                    </div>
                )
            }
            for (var i in scrapedData.jobs){
                let descriptions_arr = [];
                for (var j in scrapedData.jobs[i].descriptions) {
                    descriptions_arr.push(
                        <li key={j}>{scrapedData.jobs[i].descriptions[j].description}</li>
                    )
                }
                jobsForDisplay.push(<div key={i}>
                    <h3>{scrapedData.jobs[i].position}</h3>
                    <p>{scrapedData.jobs[i].companyName}</p>
                    <p>{scrapedData.jobs[i].startedDate} - {scrapedData.jobs[i].endDate}</p>
                    <ul>
                        {descriptions_arr}
                    </ul>
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
                {scrapedData? 
                <div className={classes.resumeContainer}>
                    {profile}
                    <h2>EDUCATION</h2>
                    {schools}
                    <h2>JOB / PROJECT EXPERIENCE</h2>
                    {jobsForDisplay}
                </div> : null}
                
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