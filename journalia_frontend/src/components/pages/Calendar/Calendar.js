import {React, useEffect} from 'react'

import { useDispatch, useSelector, connect } from "react-redux";

import {requestAccessToken} from '../../../state/slices/auth/AuthSlice';

const Calendar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      CALENDAR
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    accessToken: null, // logged in user's current access token
    isAuthenticated: false, // boolean indicating if a user is logged in
    messages: null, // response messages
    user: null, // object with auth user data
  };
};

export default connect(mapStateToProps)(Calendar)
