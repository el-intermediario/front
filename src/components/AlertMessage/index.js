import React from 'react';
import { Alert } from 'reactstrap';

const AlertMessage = ({message, type}) => {
  return (
    // type: 'waring', 'danger', 'success', 'primary';
    <Alert color={type}>{message}</Alert>
  )
}

export default AlertMessage;