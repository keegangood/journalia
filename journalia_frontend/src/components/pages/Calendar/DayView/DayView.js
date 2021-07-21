import { React, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import "./scss/DayView.scss";
import { useScrollData } from "scroll-data-hook";
import DayContainer from "./DayContainer";

import {addNextDay, addPrevDay, getJournalItems} from '../../../../state/slices/CalendarSlice';

const DayView = ({ day }) => {
  const dispatch = useDispatch();
  const scrollData = useScrollData();
  
  const { calendarLoadingStatus, dayObjects } = useSelector(
    (state) => state.calendar
    );
    
  const dayViewRef = useRef(null);
  const dayContainerRefs = useRef([]);

  // dayOffset - integer 1 or -1
  const addDay = (dayOffset) => {};

    useEffect(()=>{
      console.log(dayContainerRefs)
    },[dayContainerRefs])

  useEffect(() => {
    const scrolling = scrollData.scrolling; // true/false
    const scrollTime = scrollData.time;

    // position and direction of scroll
    const scrollPosY = scrollData.position.y;
    const scrollDirection = scrollData.direction.y;

    // height of container holding all currently loaded days
    const dayViewHeight = dayViewRef.current.getBoundingClientRect().height / 2;

    if (scrolling && scrollTime === 0) {
      if (scrollPosY < dayViewHeight && scrollDirection === "up") {
        console.log(
          "\n********************\nLOAD PREV DAY\n********************"
        );
      } else if (scrollPosY > dayViewHeight && scrollDirection === "down") {
        console.log(
          "\n********************\nLOAD NEXT DAY\n********************"
        );
      }
    }
  }, [scrollData]);

  return (
    <div className="px-2" id="day-view" ref={dayViewRef}>
        <span className="my-5"></span>
        <div className="container-fluid px-1" ref={el=>dayContainerRefs.current.push(el)}>
          <DayContainer />
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    calendarLoadingStatus: state.calendarLoadingStatus,
    dayObjects: state.dayObjects
  };
};

export default connect(mapStateToProps)(DayView);
