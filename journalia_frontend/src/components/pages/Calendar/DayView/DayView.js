import { React, useEffect } from "react";
import '../scss/DayView.scss';

import { useDispatch } from "react-redux";

const DayView = () => {
  const dispatch = useDispatch();

  return (
      <div className="row" id="day-view">
        <div className="col col-12 text-center">DAY</div>
      </div>
  );
};

export default DayView;
