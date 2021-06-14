import "./App.scss";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../state/slices";
import thunk from "redux-thunk";

import { createBrowserHistory } from "history";

import Navbar from "../components/layout/Navbar";
import MobileNav from "../components/layout/MobileNav";

import Homepage from "../components/pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";

const history = createBrowserHistory();

let store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="app container-fluid p-0 flex" id="main-container">
        <Router>
          {/* show nav unless on login or signup pages.
        Eventually this will be based on isAuthenticated */}
          {history.location.pathname !== "/login" &&
            history.location.pathname !== "/signup" && <Navbar />}
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login">
            <UserAuth pageAction={"login"} pageTitle={"Log in"} />
          </Route>
          <Route exact path="/signup">
            <UserAuth pageAction={"signup"} pageTitle={"Sign up"} />
          </Route>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
