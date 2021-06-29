import React from "react";

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
    <div className="px-0 position-fixed w-100" id="date-display">
        <DayContent date={date} dayName={dayName} />
    </div>
  );
};

export default DateDisplay;
