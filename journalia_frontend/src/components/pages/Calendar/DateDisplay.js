import React from "react";
import DateSwitcherArrows from "./DateSwitcherArrows";

import "./scss/DateDisplay.scss";

const DayContent = ({ date, dayName }) => (
  <div className="py-2 text-center flex flex-col align-items-center justify-content-center">
    <div className="display-6">{dayName}</div>
    <div>{date}</div>
  </div>
);

const DateDisplay = ({ date, dayName, dayOffset }) => {
  const weekContent = <span>Jun 28 - Jul 5, 2021</span>;
  const monthContent = <span>June, 2021</span>;
  const yearContent = <span>2021</span>;

  return (
    <div
      className="row mx-0 px-0 position-fixed w-100 d-flex justify-content-center"
      id="date-display"
    >
      <div
        className="
          p-0
          col
          col-2
          offset-lg-2
          d-flex
          justify-content-center
          align-items-center
          text-center"
      >
        {dayOffset === -1
          ? "Yesterday"
          : dayOffset === 0
          ? "Today"
          : dayOffset === 1
          ? "Tomorrow"
          : ""}
      </div>
      <div className="col col-6">
        <DayContent date={date} dayName={dayName} />
      </div>
      <div className="col col-2 d-flex flex-col justify-content-center align-items-center">
        <DateSwitcherArrows />
      </div>
    </div>
  );
};

export default DateDisplay;
