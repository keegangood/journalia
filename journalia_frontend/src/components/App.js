import "./App.scss";
import { Router, Route, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../state/slices";
import thunk from "redux-thunk";

import Navbar from "../components/layout/Navbar";
import MobileNav from "../components/layout/MobileNav";

import Homepage from "../components/pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";

let store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

let history = createBrowserHistory();

const App = (props) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="app container-fluid p-0 flex" id="main-container">
          {/* show nav unless on login or signup pages.
        Eventually this will be based on isAuthenticated */}
          {true ? <Navbar /> : ""}
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
    </Provider>
  );
};

export default App;
