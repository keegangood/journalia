import dayjs from "dayjs";
import { weekday } from "dayjs/plugin/weekday";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8000";
const headers = {
  "Content-Type": "application/json",
};

/**
 * GET JournalItems for a particular date range - day, week, month or year
 */
export const getJournalItems = createAsyncThunk(
  "calendar/getJournalItems",
  async ({ accessToken, startDate, dateInterval }, { rejectWithValue }) => {
    startDate = dayjs(startDate).format("YYYY-MM-DD");
    const endDate = dayjs(startDate).add(1, dateInterval).format("YYYY-MM-DD");

    const url = BASE_URL + "/" + new URLSearchParams({ startDate, endDate, dateInterval });

    const options = {
      method: "GET",
      headers: { ...headers, Authorization: `token ${accessToken}` },
      credentials: "include", // to set cookies
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const getAdditionalJournalItems = createAsyncThunk(
  "calendar/getAdditionalJournalItems",
  async ({ accessToken, startDate, dateInterval }, { rejectWithValue }) => {
    startDate = dayjs(startDate).format("YYYY-MM-DD");
    const endDate = dayjs(startDate).add(1, dateInterval).format("YYYY-MM-DD");

    const url = BASE_URL + "/" + new URLSearchParams({ startDate, endDate, dateInterval });

    const options = {
      method: "GET",
      headers: { ...headers, Authorization: `token ${accessToken}` },
      credentials: "include", // to set cookies
    };

    const response = await fetch(url, options);

    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

const initialState = {
  journalItems: null,
  calendarLoadingStatus: "PENDING",
  currentDate: null, // today's date
  dayOffset: 0, // offset from current day in days
  activeDay: null, // date of currently displayed day
  activeDayName: null, // activeDay name
};

const CalendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      const currentDate = action.payload;
      let dayName = dayjs(currentDate);
      dayName = dayName.weekday(dayName.get("day")).format("dddd");
      return {
        ...state,
        currentDate: currentDate,
        activeDay: currentDate,
        activeDayName: dayName,
        calendarLoadingStatus: "IDLE",
      };
    },
    setActiveDate: (state, action) => {
      const currentDate = action.payload;
      let dayName = dayjs(currentDate);
      dayName = dayName.weekday(dayName.get("day")).format("dddd");
      return {
        ...state,
        activeDay: currentDate,
        activeDayName: dayName,
        calendarLoadingStatus: "IDLE",
      }
    },
    setDayOffset: (state, action) => {
      return {
        ...state,
        dayOffset: action.payload,
        calendarLoadingStatus: "IDLE",
      };
    },
    addNextDay: (state, action) => {
      return {
        ...state,
        dayObjects: state.dayObjects.push(action.payload.journalItems),
        calendarLoadingStatus: "IDLE",
      };
    },
    addPrevDay: (state, action) => {
      return {
        ...state,
        dayObjects: state.dayObjects.unshift(action.payload.journalItems),
        calendarLoadingStatus: "IDLE",
      };
    },
  },
  extraReducers: {
    [getJournalItems.pending]: (state, action) => {
      state.calendarLoadingStatus = "PENDING";
    },
    [getJournalItems.fulfilled]: (state, action) => {
      state.journalItems = action.payload.journalItems;
      state.calendarLoadingStatus = "IDLE";
    },
    [getJournalItems.rejected]: (state, action) => {
      state.journalItems = [];
      state.calendarLoadingStatus = "IDLE";
    },
  },
});

export const { setCurrentDate, setDayOffset, addNextDay, addPrevDay } =
  CalendarSlice.actions;

export default CalendarSlice.reducer;
