import React, { Component } from 'react';
import classes from './FullExpJob.css';
import axios from '../../../../axios';
import LoadingAnimation from '../../../../components/UI/LoadingAnimation/LoadingAnimation';
import Button from '../../../../components/UI/Button/Button';

class FullExpJob extends Component {
    
    state = {
        loadedPost: null
    }

    componentDidMount () {
        this.loadData();
    }


    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                axios.get( '/jobs/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}} )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/jobs/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
            .then(response => {
                console.log(response);
            });
    }

    editPostHandler = () => {
        axios.delete('/jobs/' + this.props.match.params.id, { headers: { "x-auth":  localStorage.getItem("token")}})
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
        let post = null;
        
        if ( this.props.match.params.id ) {
            post = <LoadingAnimation />;
        }
        if ( this.state.loadedPost ) {
            console.log(this.state.loadedPost);

            var descriptions = this.state.loadedPost.job[0].descriptions.map((d, index) => {
                return <p key={index}>{d.description}</p>
            });


            post = (
                <div className={classes.FullExpJob}>
                    <h1>{this.state.loadedPost.job[0].position}</h1>
                    <p>{this.state.loadedPost.job[0].companyName}</p>
                    <p>Start: {new Date(this.state.loadedPost.job[0].startedDate).toISOString().split('T')[0]}</p>
                    <p>End: {new Date(this.state.loadedPost.job[0].endDate).toISOString().split('T')[0]}</p>
                    {descriptions}
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

export default FullExpJob;