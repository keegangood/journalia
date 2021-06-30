import React from "react";
import './scss/DateSwitcherArrows.scss';

import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { useDispatch, useSelector, connect } from "react-redux";
import { setDayOffset } from "../../../state/slices/CalendarSlice";


const DateSwitcherArrows = ({}) => {
  const dispatch = useDispatch();
  let {dayOffset} = useSelector(state=>state.calendar)

  console.log(dayOffset)

  const incrementDayOffset = () => {
    dispatch(setDayOffset(++dayOffset));
  }

  const decrementDayOffset = () => {
    dispatch(setDayOffset(--dayOffset));
  }

  return (
    <div className="d-flex" id="date-switcher-arrows">
      <div className="date-switcher-arrow p-2" onClick={decrementDayOffset}>
        <AiOutlineCaretLeft />
      </div>
      <div className="date-switcher-arrow p-2" onClick={incrementDayOffset}>
        <AiOutlineCaretRight />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dayOffset: state.calendar.dayOffset
  }
}

export default connect(mapStateToProps)(DateSwitcherArrows);
