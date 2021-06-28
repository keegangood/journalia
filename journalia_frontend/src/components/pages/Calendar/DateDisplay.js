import React from "react";

const DayContent = ({ date }) => (
  <div className="col col-12 text-center">
    <div>{date.dayName}</div>
    <div>{date.date}</div>
  </div>
);

const DateDisplay = ({ date, dayName }) => {
  const weekContent = <span>Jun 28 - Jul 5, 2021</span>;
  const monthContent = <span>June, 2021</span>;
  const yearContent = <span>2021</span>;

  return (
    <div className="row mt-6" id="date-display">
      {<DayContent date={date} dayName={dayName}/>}
    </div>
  );
};

export default DateDisplay;
