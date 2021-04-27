import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions';

export default function Logout() {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(logout());
  }

  return (
    <>
      <button type="submit" className="logoutBtn" onClick={logoutHandler}>
        Log Out
      </button>
    </>
  );
}
