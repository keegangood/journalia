import { React, useEffect } from "react";

import { useDispatch } from "react-redux";

const WeekView = () => {
  const dispatch = useDispatch();

  return (
    <div className="container-fluid" id="calendar-container">
      <div className="row">
        <div className="col col-12 text-center">WEEK</div>
      </div>
    </div>
  );
};

export default WeekView;
