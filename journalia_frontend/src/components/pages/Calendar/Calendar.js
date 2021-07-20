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
import DateDisplay from "./DateDisplay/DateDisplay";

import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";
import MonthView from "./MonthView/MonthView";
import YearView from "./YearView/YearView";

import { requestAccessToken } from "../../../state/slices/auth/AuthSlice";
import {
  setCurrentDate,
  setDayOffset,
  getJournalItems,
} from "../../../state/slices/CalendarSlice";
import { unwrapResult } from "@reduxjs/toolkit";

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(toObject);

const Calendar = ({ history }) => {
  const dispatch = useDispatch();

  const { currentDate, dayName, calendarLoadingStatus, dayOffset, journalItems } =
    useSelector((state) => state.calendar);
  const { accessToken } = useSelector((state) => state.auth);

  // get JournalItems for the current view
  useEffect(() => {
    const dateInterval = history.location.pathname.split("/")[2];
    // console.log("currentDate:", currentDate);
    if (calendarLoadingStatus != 'PENDING' && !currentDate) {
      dispatch(getJournalItems({ accessToken, startDate:currentDate, dateInterval }))
        .then(unwrapResult)
        .then((res) => {
        console.log('fulfilled', res)

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [calendarLoadingStatus, currentDate]);


  useEffect(() => {
    let currentDate = dayjs().add(dayOffset, "day");
    let time = currentDate.format("HH:mm:ss");
    currentDate = currentDate.format("YYYY-M-D");

    dispatch(setCurrentDate(currentDate));
  }, [dayOffset, currentDate]);

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
              <DateDisplay
                currentDate={currentDate}
                dayName={dayName}
                dayOffset={dayOffset}
              />
              <Route
                path="/app/day"
                component={DayView}
                currentDate={currentDate}
              />
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
    dayOffset: state.calendar.dayOffset,
  };
};

export default connect(mapStateToProps)(Calendar);
