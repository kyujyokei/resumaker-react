import React, { Component } from 'react';
import classes from './FullExpSchool.css';
import axios from '../../../../axios';
import LoadingAnimation from '../../../../components/UI/LoadingAnimation/LoadingAnimation';
// import Button from '../../../../components/UI/Button/Button';
import {Redirect} from 'react-router-dom';
import Tags from '../../../../components/Tags/Tags';
import Tag from '../../../../components/UI/Tag/Tag';

class FullExpSchool extends Component {
    
    state = {
        loadedPost: null,
        redirect: false
    }

    componentDidMount () {
        this.loadData();
    }


    loadData () {
        console.log("Bubui");
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                axios.get( '/schools/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}} )
                    .then( response => {
                        console.log("R:", response);
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/schools/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({redirect: true});
                    
                }
            });

    }

    editPostHandler = () => {
        axios.delete('/schools/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
            });
    }

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
      

    render () {
        console.log(this.state);
        let post = null;
        
        if ( this.props.match.params.id ) {
            post = <LoadingAnimation />;
        }
        if ( this.state.loadedPost ) {
            console.log(this.state.loadedPost);
            
            

            let shouldRedirect = null;
            if (this.state.redirect) {
                shouldRedirect = <Redirect to="/exps/"/>
            }
            post = (
                <div className={classes.FullExpSchool}>
                    {shouldRedirect}
                    <h1>{this.state.loadedPost.school[0].schoolName}</h1>
                    <p>{this.state.loadedPost.school[0].major}</p>
                    <p>GPA: {this.state.loadedPost.school[0].gpa}</p>
                    <p>Start: {new Date(this.state.loadedPost.school[0].startedDate).toISOString().split('T')[0]}</p>
                    <p>End: {new Date(this.state.loadedPost.school[0].endDate).toISOString().split('T')[0]}</p>
                    <div >
                        <button onClick={this.editPostHandler} className="Edit">Edit</button>
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                        
                    </div>
                </div>

            );
        }
        return post;
    }

}

export default FullExpSchool;