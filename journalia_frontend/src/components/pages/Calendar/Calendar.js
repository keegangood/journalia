import { React, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Router, Route, useHistory } from "react-router-dom";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import toObject from "dayjs/plugin/toObject";

import "./scss/Calendar.scss";

import SideMenu from "./SideMenu";
import PlusButton from "./PlusButton";
import DateDisplay from "./DateDisplay";

import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";
import MonthView from "./MonthView/MonthView";
import YearView from "./YearView/YearView";

import { requestAccessToken } from "../../../state/slices/auth/AuthSlice";
import { setDate } from "../../../state/slices/CalendarSlice";

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(toObject);

const Calendar = ({ history }) => {
  const dispatch = useDispatch();

  const { date, dayName, calendarLoadingStatus } = useSelector(
    (state) => state.calendar
  );

  console.log("calendar date", date);

  useEffect(() => {
    // const dayOfWeek = dayjs().get('day')
    let date = dayjs();
    let time = date.format();
    date = date.format("MMMM D, YYYY");
    console.log("date", date);

    // console.log('day', date.weekday(date.get('day')).format('dd'))
    // const dayName = date.weekday(date.get('day')).toObject();

    // console.log('dayName', date)
    // console.log('day', dayOfWeek)
    dispatch(setDate(date));
  }, []);

  return (
    <div className="container-fluid position-relative">
      {calendarLoadingStatus === "PENDING" ? (
        "Loading..."
      ) : (
        <div className="row no-gutters">
          <div className="col col-md-2 d-none d-md-block px-0">
            <SideMenu />
          </div>
          <div className="col col-12 col-md-10 px-0 mt-3">
            <div className="container-fluid px-0" id="calendar-container">
              <DateDisplay date={date} dayName={dayName} />
              <Route path="/app/day" component={DayView} />
              <Route path="/app/week" component={WeekView} />
              <Route path="/app/month" component={MonthView} />
              <Route path="/app/year" component={YearView} />
            </div>
          </div>
          <PlusButton />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.accessToken, // logged in user's current access token
    isAuthenticated: state.auth.isAuthenticated, // boolean indicating if a user is logged in
    messages: state.auth.messages, // response messages
    user: state.auth.user, // object with auth user data
    date: state.calendar.date,
    dayName: state.calendar.dayName,
  };
};

export default connect(mapStateToProps)(Calendar);
