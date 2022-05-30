import React, { Component } from 'react';
import api from '../../utils/api';
const placeholder = api.frontUrl + '/images/placeholder.jpg';

const Placeholder = ({asset}) => {
    return (
        <img src={placeholder} alt="placeholder"/>
    )
}

export default Placeholder;