import { React, useEffect } from 'react';

import 'axios';

import setAxiosBaseUrl from '../../../utils/setAxiosBaseUrl';
import setAccessToken from '../../../utils/setAccessToken';

import {
  requestAccessToken,
  register,
  login,
  loadUser,
  logout
} from '../../../state/slices/auth/authHelpers';

import './scss/Login.scss';
import LoginForm from './LoginForm';
import { ReactComponent as Logo } from '../../../assets/img/Logo.svg';

const Login = () => {

  return (
    <div
      className="
          container-fluid 
          w-90 
          page-container 
          flex flex-column 
          justify-content-center"
      id="login-page">
      <div id="login-form-container">

        <div className="row">
          <div className="col col-10 offset-1 pt-4" id="login-header">
            <a href="/" className="logo-sm me-2">
              <Logo />
            </a>
            <div className="display-6" id="app-title">
              <span className="display-8">J</span>ournalia
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col col-10 offset-1 login-title  pt-5">
            <p className="px-2">Log in</p>
          </div>
        </div>
        <div className="row">
          <div className="col col-10 offset-1">
            <LoginForm />
          </div>
        </div>
        <div className="row">
          <div className="col col-10 offset-1 text-center p-4 small">
            Don't have an account? <a href="/signup" className="link-danger text-decoration-none" id="signup-link">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
