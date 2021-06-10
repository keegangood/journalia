import { React, useEffect } from 'react';

import 'axios';

import setAxiosBaseUrl from '../../../utils/setAxiosBaseUrl';
import setAccessToken from '../../../utils/setAccessToken';
import titleize from '../../../utils/titleize';

import {
  requestAccessToken,
  register,
  login,
  loadUser,
  logout
} from '../../../state/slices/auth/authHelpers';

import './scss/UserAuth.scss';
import UserAuthForm from './UserAuthForm';
import { ReactComponent as Logo } from '../../../assets/img/Logo.svg';

const LoginExtra = (
  <div className="row">
    <div className="col col-10 offset-1 text-center p-4 small">
      Don't have an account? <a href="/signup" className="link-danger text-decoration-none" id="signup-link">Sign up</a>
    </div>
  </div>
);

const SignupExtra = (
  <div className="row">
    <div className="col col-10 offset-1 text-center p-4 small">
      Already have an account? <a href="/login" className="link-danger text-decoration-none" id="signup-link">Log in</a>
    </div>
  </div>
);


const UserAuth = ({ pageAction, pageTitle, ...props }) => {

  return (
    <div
      className="
          container-fluid 
          w-90 
          page-container 
          flex flex-column 
          justify-content-center"
      id="user-auth-page">
      <div id="user-auth-form-container">
        <div className="row">
          <div className="col col-10 offset-1 pt-4" id="user-auth-header">
            <a href="/" className="logo-sm">
              <Logo />
            </a>
            <span className="display-7" id="app-title">
              ournalia
            </span>

          </div>
        </div>
        <div className="row">
          <div className="col col-10 offset-1 user-auth-action-title  pt-5">
            <p className="px-2">{pageTitle}</p>
          </div>
        </div>
        <div className="row">
          <div className="col col-10 offset-1">
            <UserAuthForm formAction={pageAction} />
          </div>
        </div>

        {pageAction === 'login' ? (LoginExtra): (SignupExtra)}

      </div>
    </div>
  )
}

export default UserAuth
