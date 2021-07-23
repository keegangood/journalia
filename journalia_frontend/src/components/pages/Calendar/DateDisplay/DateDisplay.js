import { current } from "@reduxjs/toolkit";
import { React, useEffect, useState } from "react";

import dayjs from "dayjs";

import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { useDispatch, useSelector, connect } from "react-redux";
import { setDayOffset } from "../../../../state/slices/CalendarSlice";

import "./DateDisplay.scss";

const DayContent = ({ currentDate, dayName, dayOffset }) => (
  <div className="py-1 text-center flex flex-col justify-content-center ">
    <div className="main-display">{currentDate}</div>
    <div className="post-display">{dayName}</div>
  </div>
);

const weekContent = <span>Jun 28 - Jul 5, 2021</span>;
const monthContent = <span>June, 2021</span>;
const yearContent = <span>2021</span>;

const DateSwitcherArrows = ({}) => {
  const dispatch = useDispatch();
  let { currentDate, activeDayName, dayOffset } = useSelector(
    (state) => state.calendar
  );
  const [dateString, setDateString] = useState("");

  
  const incrementDayOffset = () => {
    dispatch(setDayOffset(++dayOffset));
  };

  const decrementDayOffset = () => {
    dispatch(setDayOffset(--dayOffset));
  };

  // reformat currentDate
  useEffect(() => {
    if (currentDate) {
      currentDate = dayjs(currentDate).format("MMMM DD, YYYY");
      setDateString(currentDate);
    }
  }, [currentDate]);

  return (
    <div className="position-fixed mx-0 px-0 w-100" id="date-display">
      <div className="row">
        <div className="col col-2 col-md-4 offset-md-1 d-flex justify-content-end align-items-center">
          <div className="date-switcher-arrow" onClick={decrementDayOffset}>
            <AiOutlineCaretLeft />
          </div>
        </div>

        <div className="col col-8 col-md-2">
          <DayContent
            currentDate={dateString}
            dayName={activeDayName}
            dayOffset={dayOffset}
          />
          <div
            className={
              "pre-display col-4 offset-4 mb-2 text-center badge badge-sm rounded-pill bg-secondary" +
              (Math.abs(dayOffset) <= 1 ? "" : "hidden")
            }
          >
            {dayOffset === -1 ? (
              "Yesterday"
            ) : dayOffset === 0 ? (
              "Today"
            ) : dayOffset === 1 ? (
              "Tomorrow"
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>

        <div className="col col-2 col-md-4 d-flex align-items-center">
          <div className="date-switcher-arrow" onClick={incrementDayOffset}>
            <AiOutlineCaretRight />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dayOffset: state.calendar.dayOffset,
    activeDayName: state.calendar.activeDayName,
    date: state.calendar.date,
  };
};

export default connect(mapStateToProps)(DateSwitcherArrows);
