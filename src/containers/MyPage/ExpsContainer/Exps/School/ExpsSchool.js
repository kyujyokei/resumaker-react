import React, { Component } from 'react';
import School from '../../../../../components/Exp/School/School';
import classes from './ExpsSchool.css'
// import Aux from '../../../../../hoc/Aux';
import { Route, Link } from 'react-router-dom';
import FullExpSchool from '../../../FullExp/FullExpSchool/FullExpSchool';
import axios from '../../../../../axios';
import Button from '../../../../../components/UI/Button/Button';
import LoadingAnimation from '../../../../../components/UI/LoadingAnimation/LoadingAnimation';
import NewExpSchool from '../../../NewExp/NewExpSchool/NewExpSchool';

class ExpsSchool extends Component {
    
    
    state = {
        schools: [],
        schoolSelected: null,
        loading: true
    }

    componentDidMount () {
        axios.get( '/schools/me', { headers: { "x-auth":  localStorage.getItem("token")}}) // this is from https://jsonplaceholder.typicode.com/posts
            .then( response => {
                const schools = response.data.schools;
                const updatedSchools = schools.map( school => {
                    return {
                        ...school // can edit each post here
                    }
                });
                this.setState( { schools: updatedSchools } );
                this.setState({loading: false});
            }).catch( error => {
                console.log( error );
            });
    }

    schoolSelectHandler = ( id ) => {
        this.props.history.push( '/exps/school/' + id );
        this.setState( { schoolSelected: id } )
    }


    render() {

        let schools = <p>The place for schools</p>;
        
        if ( !this.state.error ){
            if ( !this.state.schoolSelected ) {
                schools = this.state.schools.map( school => {
                    // console.log("SCHOOL: ", school);
                    return (
                        <School
                        key={school._id}
                        schoolName={school.schoolName}
                        gpa={school.gpa}
                        major={school.major}
                        endDate={new Date(school.endDate).toISOString().split('T')[0]}
                        startedDate={new Date(school.startedDate).toISOString().split('T')[0]}
                        clicked={() => this.schoolSelectHandler( school._id )} />
                    );
                });
            } 
        } else {
            console.log(this.state.error);
        }

        return (
                  
            <div >
    
                <h3>EDUCATION</h3>
                <Link to='/school/new'>
                    <Button btnType="BlueRounded">+ NEW</Button>
                </Link>
                {this.state.loading ? <LoadingAnimation/> : null}  
                <section className={classes.Exps}>
                    {schools}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullExpSchool} />
            </div>
        );
    }
}

export default ExpsSchool;