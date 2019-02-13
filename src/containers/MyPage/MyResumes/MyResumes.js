import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './MyResumes.css'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PDFExport } from '@progress/kendo-react-pdf';
import Tutorial from '../ExpsContainer/Tutorial/Tutorial';
import Modal from '../../../components/UI/Modal/Modal';


class MyResumes extends Component {

    resume;

    state = {
        url: null,
        valid: false,
        textMode: false,
        showTutorial: false
    }

    postBtnHandler = () => {
        this.props.postRes(this.state.url, this.state.textMode);
    }

    inputChangedHandler = (event) => {
        this.setState({url: event.target.value});
        console.log(this.state.url);
    }

    exportPDF = () => {
        console.log('exportPDF');
        this.resume.save();
    }

    changeTextModeHandler = () => {
        let curr = this.state.textMode;
        this.setState({ textMode: !curr });
    }

    toggleTutorialHandler = () => {
        let current = this.state.showTutorial;
        this.setState({showTutorial: !current});
    }

    render () {
        let scrapedData = this.props.data;
        let schools = [];
        let jobsForDisplay = [];
        let profile = [];
        console.log("scraped data: ", scrapedData);

        let tutorialArray = [<div>
            <p>This is the exciting part...</p>
            <p>Paste the job description URL and generate your resume!</p>
            <p></p>
            <p></p>
        </div>,
        <div>
            <p>After the resume has been generated, click save PDF to save the resume to your local drive</p>
            <p>As for the alpha version, the resume would not be stored in the database/</p>
            <p></p>
        </div>,
        <div>

            <p>If the URL was not scrapeable (a.k.a. nothing returns), you can also switch to TEXT MODE, simply copy and paste the job description text in to the text box.</p>
        </div>
        ];

        let pages = tutorialArray.length;
        let tutorials = <Tutorial
                            totalPage={pages}>
                            {tutorialArray}</Tutorial>;

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
                        <p className={classes.SchoolName}>{scrapedData.schools[i].schoolName}, {scrapedData.schools[i].location}</p> <p className={classes.SchoolDate}> {new Date(scrapedData.schools[i].startedDate).toISOString().split('T')[0]} - {new Date(scrapedData.schools[i].endDate).toISOString().split('T')[0]}</p>

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
                    <p>{scrapedData.jobs[i].companyName}, {scrapedData.jobs[i].location}</p>
                    
                    <p>{new Date(scrapedData.jobs[i].startedDate).toISOString().split('T')[0]} - {new Date(scrapedData.jobs[i].endDate).toISOString().split('T')[0]}</p>
                    <ul>
                        {descriptions_arr}
                    </ul>
                </div>);
            }
        }



        return (
            <Aux>
                <Button btnType="Help" clicked={this.toggleTutorialHandler}>? Help</Button>
                <Modal show={this.state.showTutorial} modalClosed={this.toggleTutorialHandler}>
                    {tutorials}
                </Modal>
                <div>
                    <p>Paste job description : </p>
                    <p><Button btnType="Success" disabled={this.state.textMode} clicked={this.changeTextModeHandler}> URL </Button> | <Button btnType="Success" clicked={this.changeTextModeHandler} disabled={!this.state.textMode}>plain text</Button></p>
                    <Input 
                        className={classes.JobLink} 
                        changed={(event) => this.inputChangedHandler(event)}
                        ></Input>
                </div>

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
        postRes: ( url, isText ) => dispatch(actions.postRes(url, isText)),
        resetState: () => dispatch(actions.resPostReset)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (MyResumes));