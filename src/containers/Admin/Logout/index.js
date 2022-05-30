import React, { useEffect } from 'react';
import { userLogout } from '../../../store/actions/index';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    logout();
  }, [])

  const logout = () => {
    dispatch(userLogout(false));
    history.push('/');
  }

  return (
    <></>
  );
}

export default Logout;