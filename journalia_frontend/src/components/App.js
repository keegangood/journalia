import "./App.scss";
import { Router, Route, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector, connect } from "react-redux";


import Navbar from "./layout/Navbar";
import MobileNav from "../components/layout/MobileNav";

import Homepage from "../components/pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";


let history = createBrowserHistory();

const App = (props) => {
  
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
      <Router history={history}>
        <div className="app container-fluid p-0 flex" id="main-container">
          {/* show nav unless on login or signup pages.
        Eventually this will be based on isAuthenticated */}
          <Navbar isAuthenticated={isAuthenticated}/>
          <Route exact path="/" component={Homepage} />
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
          ></Route>
        </div>
      </Router>
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

export default connect(mapStateToProps)(App);
