import React, {Component} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';

class NewSkill extends Component {



    componentDidMount () {
        // console.log(this.props);
        this.props.onInitSkills();
        console.log(this.props);
        console.log(this.state);
    }



    // mapSkills () {
    //     this.state.skills.map()
    // }

    render () {
        return (
            <Aux>
                <p>Please make sure your tag has not yet been created : </p>
                {/* <Select options={this.state.skills.skills} /> */}
            </Aux>
        );
    };
}


const mapStateToProps = state => {
    return {
        skills: state.skills,
        error: state.error
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onInitSkills: () => dispatch(actions.initSkills())
    }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewSkill));
