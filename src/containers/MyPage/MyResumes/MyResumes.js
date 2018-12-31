import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './MyResumes.css'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PDFExport } from '@progress/kendo-react-pdf';



class MyResumes extends Component {

    resume;

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

    exportPDF = () => {
        console.log('exportPDF');
        this.resume.save();
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
                    <p className={classes.FirstName}>{user.f_name.toUpperCase()}</p> <p className={classes.LastName}>{user.l_name.toUpperCase()}</p>
                    <p>{user.email} | {user.phone} | {user.address} </p>
                </div>
            );
            for (var i in scrapedData.schools){
                schools.push(
                    <div key={scrapedData.schools[i]._id}>                 
                        <p className={classes.SchoolMajor}>{scrapedData.schools[i].major} GPA: {scrapedData.schools[i].gpa} </p>
                        <p className={classes.SchoolName}>{scrapedData.schools[i].schoolName}</p> <p className={classes.SchoolDate}> {new Date(scrapedData.schools[i].startedDate).toISOString().split('T')[0]} - {new Date(scrapedData.schools[i].endDate).toISOString().split('T')[0]}</p>

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
                    
                    <p>{new Date(scrapedData.jobs[i].startedDate).toISOString().split('T')[0]} - {new Date(scrapedData.jobs[i].endDate).toISOString().split('T')[0]}</p>
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
                <PDFExport paperSize={'A4'}
                    scale={0.6}
                    fileName="resume.pdf"
                    title=""
                    subject=""
                    keywords=""
                    ref={(r) => this.resume = r}>
                    {scrapedData? 
                    <Aux>
                        <div className={classes.resumeContainer}>
                            {profile}
                            <p className={classes.SectionTitle}>EDUCATION</p>
                            {schools}
                            <p className={classes.SectionTitle}>JOB / PROJECT EXPERIENCE</p>
                            {jobsForDisplay}
                        </div>
                       
                    </Aux> : null}
                </PDFExport>
                {scrapedData? <Button btnType="Danger" clicked={this.exportPDF}>Download PDF</Button> : null}
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