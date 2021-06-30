import dayjs from "dayjs";
import { weekday } from "dayjs/plugin/weekday";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8000/journals";
const headers = {
  "Content-Type": "application/json",
};


const initialState = {
  journalItems: null,
  calendarLoadingStatus: "PENDING",
  date: null,
  dayName: null,
  dayOffset: 0
};

const CalendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setDate: (state, action) => {
      const date = action.payload;
      let dayName = dayjs(date)
      dayName = dayName.weekday(dayName.get('day')).format('dddd');
      console.log('dayname', dayName)
      return {
        ...state,
        date: date,
        dayName: dayName, 
        calendarLoadingStatus: "IDLE"
      };
    },
    setDayOffset: (state, action) => {
      return {
        ...state,
        dayOffset: action.payload,
        calendarLoadingStatus: "IDLE"
      }
    }
  },
});

export const { setDate, setDayOffset } = CalendarSlice.actions;

export default CalendarSlice.reducer;
