import React, { Component } from 'react';
// import TopImage from '../../../assets/images/front.png';
import classes from './CoverPage.css';
import Button from '../../../components/UI/Button/Button';


import NavigationHeader from '../../../components/Navigation/NavigationHeader';

class CoverPage extends Component {



    render () {

        return (
            <div className={classes.Background}>

                {/* <img src={TopImage} className={classes.TopImage}/> */}
                <NavigationHeader className={classes.NavigationHeader} bgType={""}/>
                <div className={classes.Main}>
                    <div className={classes.Top}>
                        <h1>Manage your resume<br/>in seconds!</h1>
                        <h3>This is an alpha version of Resumaker</h3>
                        <p>Please try it out and let me know your feedback!</p>
                        <Button btnType="Cover">Get Started!</Button>
                    </div>
                    
                   
                </div>
            </div>
        );
    }
}


export default CoverPage;