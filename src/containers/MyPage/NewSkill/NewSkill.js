import React, {Component} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Aux from '../../../hoc/Aux';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';

class NewSkill extends Component {

    componentDidMount () {
        this.props.onInitSkills();
        // console.log("STATE",this.props.skills);
    }

    render () {
        
        var skillsList = [];
        if (!this.props.skills) {
            skillsList = [];
        } else {
            skillsList = this.props.skills
        }
        return (
            <Aux>
                <p>Please make sure your tag has not yet been created : </p>
                <Select options={skillsList} />
            </Aux>
        );
    };
}


const mapStateToProps = state => {
    return {
        skills: state.skill.skills,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitSkills: () => dispatch(actions.initSkills())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewSkill));
