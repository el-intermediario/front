import React, { useEffect } from 'react';
import { userLogout } from '../../../store/actions/index';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if(user) {
      logout();
    }
  }, [])

  const logout = () => {
    dispatch(userLogout(false));
    return <Redirect to="/" />
  }

  return (
    <></>
  );
}

export default Logout;