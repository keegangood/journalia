import { React, useEffect, useRef, useState } from "react";
import "./scss/DayView.scss";
import {useScrollData} from 'scroll-data-hook';

import DayContainer from "./DayContainer";

import { useDispatch } from "react-redux";

const DayView = ({currentDate}) => {

  const dispatch = useDispatch();
  const dayViewRef = useRef(null);

  const scrollData = useScrollData();

  useEffect(() => {
    console.log(scrollData.position.y > dayViewRef.current.getBoundingClientRect().height / 2);
  }, [scrollData])
  
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
