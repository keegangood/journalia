import React from "react";
import DateSwitcherArrows from "./DateSwitcherArrows";

import "./scss/DateDisplay.scss";

const DayContent = ({ date, dayName, dayOffset }) => (
  <div className="py-3 text-center flex flex-col justify-content-center">
    <div
    className="pre-display"
      className="
      p-0
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
    <div className="display">{dayName}</div>
    <div className="post-display">{date}</div>
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
      <div className="col col-6 offset-2">
        <DayContent date={date} dayName={dayName} dayOffset={dayOffset} />
      </div>
      <div className="col col-2 d-flex flex-col justify-content-center align-items-center">
        <DateSwitcherArrows />
      </div>
    </div>
  );
};

export default DateDisplay;
