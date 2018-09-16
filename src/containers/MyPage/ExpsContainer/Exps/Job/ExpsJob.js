import React, { Component } from 'react';
import Job from '../../../../../components/Exp/Job/Job';
import classes from './ExpsJob.css'
import Aux from '../../../../../hoc/Aux';
import { Route, NavLink, Switch, Redirect, Link } from 'react-router-dom';
import FullExpJob from '../../../FullExp/FullExpJob/FullExpJob';
import axios from '../../../../../axios';
import Button from '../../../../../components/UI/Button/Button';
import NewExpJob from '../../../NewExp/NewExpJob/NewExpJob';

class ExpsJob extends Component {
    
    
    state = {
        posts: [],
        postSelected: null
    }

    componentDidMount () {
        console.log("EXP JOBS: ", this.props);
        axios.get( '/posts' ) // this is from https://jsonplaceholder.typicode.com/posts
            .then( response => {
                const posts = response.data.slice( 0, 3 );
                const updatedPosts = posts.map( post => {
                    return {
                        ...post // can edit each post here
                    }
                });
                this.setState( { posts: updatedPosts } );
            }).catch( error => {
                console.log( error );
            });
    }

    postSelectHandler = ( id ) => {
        this.props.history.push( '/exps/job/' + id );
        this.setState( { postSelected: id } )
    }


    render() {

        let posts = <p>The place for posts</p>;
        
        if ( !this.state.error ){
            if ( !this.state.postSelected ) {
                posts = this.state.posts.map( post => {
                    return (
                        <Job
                        key={post.id}
                        title={post.title}
                        date={"2018/1/1~2019/1/1"}
                        description={post.body}
                        clicked={() => this.postSelectHandler( post.id )} />
                    );
                });
            } 
        } else {
            console.log(this.state.error);
        }

        return (
                    
            <div >
                <h3>JOB EXPERIENCE</h3>
                <Link to='/job/new'>
                    <Button btnType="BlueRounded">+ NEW</Button>
                </Link>
                <section className={classes.Exps}>
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullExpJob} />
            </div>
        );
    }
}

export default ExpsJob;