import React, { Component } from 'react';
import api from '../../utils/api';

const Placeholder = ({asset}) => {
    return (
        <img src={`${api.space}${asset}/v1651530960/shared/placeholder_dqwbao.jpg`} />
    )
}

export default Placeholder;