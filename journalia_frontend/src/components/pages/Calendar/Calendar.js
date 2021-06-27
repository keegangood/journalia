import { React, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Router, Route, useHistory } from "react-router-dom";

import "./scss/Calendar.scss";

import SideMenu from "./SideMenu";
import PlusButton from "./PlusButton";

import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";
import MonthView from "./MonthView/MonthView";
import YearView from "./YearView/YearView";

import { requestAccessToken } from "../../../state/slices/auth/AuthSlice";

const Calendar = ({ history }) => {
  const dispatch = useDispatch();

  return (
    <div className="container-fluid mt-6 position-relative">
      <div className="row">
        <div className="col col-3 col-lg-2 d-none d-md-block p-0">
          <SideMenu />
        </div>
        <div className="col col-12 col-md-9 col-lg-10 p-0">
          <div className="container-fluid" id="calendar-container">
            <Route path="/app/day" component={DayView} />
            <Route path="/app/week" component={WeekView} />
            <Route path="/app/month" component={MonthView} />
            <Route path="/app/year" component={YearView} />
          </div>
        </div>
        <PlusButton/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken, // logged in user's current access token
    isAuthenticated: state.isAuthenticated, // boolean indicating if a user is logged in
    messages: state.messages, // response messages
    user: state.user, // object with auth user data
  };
};

export default connect(mapStateToProps)(Calendar);
