import React, {Component} from 'react';
import classes from './NavigationHeader.css';
import { Link, withRouter } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
// import { FaBars, FaWindowClose } from 'react-icons/fa';


class navigationHeader extends Component {

    state = {
        exps: false,
        me: false,
        resume: false
    }
    
    render (){
        console.log('Navigation: ' ,this.state);
        let path = this.props.location.pathname;

        return (
            <div className={[classes.NavigationHeader, classes[this.props.bgType]].join(' ')}>
                <div className={classes.Content}>
                <Link to={'/'}>
                    <h2 className={classes.Title}><b>Resumaker</b> :α</h2>
                </Link>
                    {this.props.isAuthenticated ? 

                        <ul className={[classes.Nav, 'nav__'].join(' ')}>
                                    <li>{path === '/exps' ? <a><b>Experiences</b></a> : <a href="/exps">Experiences</a>}</li> 
                                    <li>{path === '/me' ? <a><b>Personal Info</b></a>: <a href="/me">Personal Info</a>}</li>
                                    <li>{path === '/resume' ? <a><b>Resume</b></a>: <a href="/resume">Resume</a>}</li>
                                    <li><a href="/logout"><Button btnType="Logout">Logout</Button></a></li>
                        </ul>

                        : <a href="/signup"><Button btnType="Login">Signin / Sign Up</Button></a>
                    }
                    
                  
                </div>
            </div> 
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchProps = dispatch => {
    return {
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchProps)(navigationHeader));