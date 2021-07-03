import { React, useEffect } from "react";
import "./scss/DayView.scss";

import DayContainer from "./DayContainer";

import { useDispatch } from "react-redux";

const DayView = () => {
  const dispatch = useDispatch();

  return (
    <div className="container-fluid" id="day-view">
      <div className="row">
        <span className="my-5"></span>
        <div className="col col-12 px-0">
          <DayContainer />
        </div>
      </div>
    </div>
  );
};

export default DayView;
