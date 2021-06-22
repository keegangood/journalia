import { React, useEffect } from "react";

import "./scss/CalendarViewSelect.scss";

import { Dropdown, DropdownButton } from "react-bootstrap";

const viewOptions = [
  { value: "day", label: "DAY" },
  { value: "week", label: "WEEK" },
  { value: "month", label: "MONTH" },
  { value: "year", label: "YEAR" },
];

const CalendarViewSelect = () => {
  return (
    <DropdownButton
      title="Button"
      menuAlign="center"
      id="calendar-view-select"
      active
    >
      {viewOptions.map((viewOption) => (
        <Dropdown.Item>{viewOption.label}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CalendarViewSelect;
