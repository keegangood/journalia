import React from "react";
import './scss/DateSwitcherArrows.scss';

import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const DateSwitcherArrows = () => {
  return (
    <div className="d-flex" id="date-switcher-arrows">
      <div className="date-switcher-arrow p-2">
        <AiOutlineCaretLeft />
      </div>
      <div className="date-switcher-arrow p-2">
        <AiOutlineCaretRight />
      </div>
    </div>
  );
};

export default DateSwitcherArrows;
