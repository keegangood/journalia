import { React, useEffect, useRef, useState } from "react";
import "./scss/DayView.scss";
import { useScrollData } from "scroll-data-hook";

import DayContainer from "./DayContainer";

import { useDispatch } from "react-redux";

const DayView = ({ currentDate }) => {
  const dispatch = useDispatch();
  const dayViewRef = useRef(null);

  const scrollData = useScrollData();

  useEffect(() => {
    const scrolling = scrollData.scrolling;
    const scrollTime = scrollData.time;

    const yPos = scrollData.position.y;
    const yDir = scrollData.direction.y;

    // height of container holding all currently loaded days
    const dayViewHeight = dayViewRef.current.getBoundingClientRect().height / 2;

    if (scrolling && scrollTime === 0) {
      if (yPos > dayViewHeight && yDir === "down") {
        console.log(
          "\n********************\nLOAD NEXT DAY\n********************"
        );
      } else if (yPos < dayViewHeight && yDir === "up") {
        console.log(
          "\n********************\nLOAD PREV DAY\n********************"
        );
      }
    }

  }, [scrollData]);

  return (
    <div className="container-fluid" id="day-view">
      <div className="row" ref={dayViewRef}>
        <span className="my-5"></span>
        <div className="col col-12 px-0">
          <DayContainer />
        </div>
      </div>
    </div>
  );
};

export default DayView;
