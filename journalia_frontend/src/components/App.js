import "./App.scss";
import { React, useEffect, useState } from "react";
import { Router, Route, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector, connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import Navbar from "./layout/Navbar/Navbar";
import MobileNav from "./layout/NavMobile";

import Homepage from "../components/pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Calendar from "./pages/Calendar/Calendar";
import PrivateRoute from "./pages/UserAuth/PrivateRoute";

import { requestAccessToken } from "../state/slices/auth/AuthSlice";

let history = createBrowserHistory();

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
  }, []);

  const { isAuthenticated, authStatus } = useSelector((state) => state.auth);

  console.log("App:", isAuthenticated, authStatus);

  return (
    <Router history={history}>
      { authStatus === "PENDING" ? (
        "Loading..."
      ) : (
        <div className="app container-fluid p-0 flex" id="main-container">
          {/* show nav unless on login or signup pages.
        Eventually this will be based on isAuthenticated */}
          <Navbar isAuthenticated={isAuthenticated} history={history}/>
          <Route exact path="/" component={Homepage} />
          <PrivateRoute
            path="/app"
            component={Calendar}
            isAuthenticated={isAuthenticated}
            authStatus={authStatus}
          />
          <Route
            exact
            path="/login"
            render={(props) => {
              return (
                <UserAuth
                  pageAction={"login"}
                  pageTitle={"Log in"}
                  history={history}
                />
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={(props) => {
              return (
                <UserAuth
                  pageAction={"signup"}
                  pageTitle={"Sign up"}
                  history={history}
                />
              );
            }}
          />
          <></>
        </div>
      )}
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken, // logged in user's current access token
    isAuthenticated: state.isAuthenticated, // boolean indicating if a user is logged in
    messages: state.messages, // response messages
    user: state.user, // object with auth user
    authStatus: state.authStatus,
  };
};

export default connect(mapStateToProps)(App);
