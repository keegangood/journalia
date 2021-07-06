import React, { useState, useRef } from "react";

import "./scss/HourContainer.scss";

const HourContainer = ({ hour, topPosition, ref }) => {

  return (
    <div className="col col-12 hour-container d-flex py-3" ref={ref}>
      <div className="hour-number d-flex py-2 align-items-center">
        <div className="d-flex align-items-center display-6">
          {hour % 12 === 0 ? 12 : hour % 12}
        </div>
        <div className="ps-1">
          {hour == 24 ? "am" : hour === 12 ? "pm" : hour <= 12 ? "am" : "pm"}
        </div>
      </div>
    </div>
  );
};

export default HourContainer;
