import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './MyResumes.css'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PDFExport } from '@progress/kendo-react-pdf';
import Modal from '../../../components/UI/Modal/Modal';
import ReactJoyride, { STATUS } from 'react-joyride';


class MyResumes extends Component {

    resume;

    state = {
        url: null,
        valid: false,
        textMode: false,
        showTutorial: false,
        run: false,
        steps: [
            {
                content: 'This is the page where resumes are generated!!! ',
                placement: 'center',
                title:<h3>Generate you resume! </h3>,
                locale: { skip: <strong aria-label="skip">SKIP</strong> },
                target: 'body',
            },
            {
                content: 'Copy & paste the URL from a job description page that you would like to apply to.',
                placement: 'left',
                target: '.input__'
            },
            {
                content: 
                    <div>
                        <p>Click here to switch between URL & plain text mode</p>
                        <p><b>URL mode:</b> Scrapes the website and reads the requirements of the job post. You will have to provide a URL in the text box.</p>
                        <p><b>Plain text mode:</b> Just in case some websites couldn't be scraped, you can copy the descriptions in a job post and paste them in the text box.</p>
                    </div>,
                placement: 'left',
                target:'.mode__switch Button'
            },
            {
                content:'Cick "Generate" to create the perfect resume for this job!',
                placement:'left',
                target: '.generate__button Button'
            }
        ]
    }

    componentDidMount(){
        let tutorialShown = localStorage.getItem('resTutoShown');
        if (!tutorialShown) {
            this.setState({run: true});
            localStorage.setItem('resTutoShown', true);
        }
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

    handleClickStart = e => {
        e.preventDefault();
    
        this.setState({
          run: true
        });
    };

    handleJoyrideCallback = data => {
        const { status, type } = data;
    
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          this.setState({ run: false });
        }

        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };

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
            <div className={classes.Content}>
                <ReactJoyride
                    callback={this.handleJoyrideCallback}
                    continuous
                    run={this.state.run}
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    steps={this.state.steps}
                    styles={{
                        options: {
                        zIndex: 10000,
                        }
                    }}
                    />
                <Button btnType="Help" clicked={this.handleClickStart}>? Help</Button>
                <Modal show={this.state.showTutorial} modalClosed={this.toggleTutorialHandler}>
                </Modal>
                <div>
                    <p>Paste job description : </p>
                    <div className="mode__switch">
                        <p><Button btnType="Success" disabled={this.state.textMode} clicked={this.changeTextModeHandler}> URL </Button> | <Button btnType="Success" clicked={this.changeTextModeHandler} disabled={!this.state.textMode}>plain text</Button></p>
                    </div>
                    <div className="input__">
                        <Input 
                            className={classes.JobLink} 
                            changed={(event) => this.inputChangedHandler(event)}
                            ></Input>
                    </div>
                    <p className={classes.Error}>{this.props.error}</p>
                </div>
                <div className="generate__button">
                    <Button btnType="BlueRounded" clicked={this.postBtnHandler}>Generate</Button>
                </div>
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
                
            </div>
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