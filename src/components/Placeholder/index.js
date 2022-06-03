import React from 'react';
import api from '../../utils/api';
const placeholder = api.frontUrl + '/images/placeholder.webp';

const Placeholder = ({asset}) => {
    return (
        <img src={placeholder} alt="placeholder"/>
    )
}

export default Placeholder;