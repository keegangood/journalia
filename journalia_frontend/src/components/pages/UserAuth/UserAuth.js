import { React, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import axios from "axios";
import setAxiosAccessToken from "../../../utils/setAxiosAccessToken";
import setAxiosBaseUrl from "../../../utils/setAxiosBaseUrl";

import "./scss/UserAuth.scss";
import UserAuthForm from "./UserAuthForm";
import { ReactComponent as Logo } from "../../../assets/img/Logo.svg";

import {
  login,
  loadUser,
  setUser,
  setMessages,
  setErrors,
} from "../../../state/slices/auth/AuthSlice";

const LoginExtra = (
  <div className="row">
    <div className="col col-10 offset-1 text-center p-4 small">
      Don't have an account?{" "}
      <a
        href="/signup"
        className="link-danger text-decoration-none"
        id="signup-link"
      >
        Sign up
      </a>
    </div>
  </div>
);

const SignupExtra = (
  <div className="row">
    <div className="col col-10 offset-1 text-center p-4 small">
      Already have an account?{" "}
      <a
        href="/login"
        className="link-danger text-decoration-none"
        id="signup-link"
      >
        Log in
      </a>
    </div>
  </div>
);

const UserAuth = ({ pageAction, pageTitle, ...props }) => {
  const dispatch = useDispatch();

  const callApi = async (formData) => {
    if (pageAction === "login") {
      const { email, password } = formData;

      dispatch(login({ email, password }))
        .then(unwrapResult)
        .then((res) => {
          
          console.log('res',res)

          // if the response contained an accessToken (ie successful response)
          if (res.accessToken) {
            dispatch(loadUser(res.accessToken));
          } else {
            // if the response didn't contain an accessToken (ie response failed)
            dispatch(setMessages(res.messages));
          }
        })
        .catch((err) => {
          console.log('FAIL')
        });
    } else if (pageAction === "signup") {
      // register()
    }
  };

  return (
    <div
      className="
          container
          page-container 
          flex flex-column 
          justify-content-center
          py-5
          mt-5 mt-lg-0"
      id="user-auth-page"
    >
      <div className="row">
        <div className="col col-11 mx-auto offset-lg-1 col-md-10 col-xl-6">
          <div className="row" id="user-auth-form-container">
            <div
              className="col col-md-10  offset-1  pt-4"
              id="user-auth-header"
            >
              <a href="/" className="logo-sm">
                <Logo />
              </a>
              <span className="display-7" id="app-title">
                ournalia
              </span>
            </div>
            <div className="row">
              <div className="col col-10 offset-1 user-auth-action-title  pt-5">
                <p className="px-2">{pageTitle}</p>
              </div>
            </div>
            <div className="row">
              <div className="col col-10 offset-1">
                <UserAuthForm
                  formAction={pageAction}
                  callApi={callApi} //{pageAction === "login" ? login : register}
                />
              </div>
            </div>

            {pageAction === "login" && LoginExtra}
            {pageAction === "signup" && SignupExtra}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: null, // logged in user's current access token
    isAuthenticated: false, // boolean indicating if a user is logged in
    messages: null, // response messages
    user: null, // object with auth user data
  };
};

export default connect(mapStateToProps)(UserAuth);
