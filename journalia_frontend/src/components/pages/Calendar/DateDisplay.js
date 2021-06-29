import React from "react";
import DateSwitcherArrows from "./DateSwitcherArrows";

import "./scss/DateDisplay.scss";

const DayContent = ({ date, dayName }) => (
  <div className="py-2 text-center flex flex-col align-items-center justify-content-center">
    <div className="display-6">{dayName}</div>
    <div>{date}</div>
  </div>
);

const DateDisplay = ({ date, dayName }) => {
  const weekContent = <span>Jun 28 - Jul 5, 2021</span>;
  const monthContent = <span>June, 2021</span>;
  const yearContent = <span>2021</span>;

  return (
    <div
      className="row mx-0 px-0 position-fixed w-100 d-flex justify-content-center"
      id="date-display"
    >
      <div className="col col-6 offset-3 offset-lg-3">
        <DayContent date={date} dayName={dayName} />
      </div>
      <div className="col col-2 offset-1 d-flex flex-col justify-content-center align-items-center">
        <DateSwitcherArrows/>
      </div>
    </div>
  );
};

export default DateDisplay;
