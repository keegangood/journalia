import { React, useEffect } from "react";

import "./scss/CalendarViewSelect.scss";

import { Dropdown, DropdownButton } from "react-bootstrap";

const viewOptions = [
  { value: "day", label: "DAY" },
  { value: "week", label: "WEEK" },
  { value: "month", label: "MONTH" },
  { value: "year", label: "YEAR" },
];

const CalendarViewSelect = ({ selectedView, setSelectedView, ...props }) => {
  const changeView = (viewPath) => {
    props.history.push(viewPath);
  };

  return (
    <div className="flex">
      {viewOptions.map((viewOption, i) => (
        <span
          className={
            "calendar-view-option " +
            (selectedView === viewOption.label ? "selected" : "")
          }
          key={`viewOption${i}`}
          onClick={() => {
            setSelectedView(viewOption.label);
            changeView(`/app/${viewOption.value}`)}
          }
        >
          {viewOption.label}
        </span>
      ))}
    </div>
  );
};

export default CalendarViewSelect;
