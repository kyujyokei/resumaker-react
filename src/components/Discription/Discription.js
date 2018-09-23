import React from 'react';
import Input from '../UI/Input/Input';
import Select from 'react-select';

const discription = (props) => (

    <div>
        <Input />
        <Select options={props.options} />
    </div>

);

export default discription;

