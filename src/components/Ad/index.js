import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Ad = ({imageUrl, url, title, height}) => {
  if (url) {
    return (
      <Link to={url} target="_blank">
        <img src={`${api.space}${imageUrl}`} height={height} alt={title} />
      </Link>
    )
  }
  return <img src={`${api.space}${imageUrl}`} height={height} alt={title} />
}

export default Ad;