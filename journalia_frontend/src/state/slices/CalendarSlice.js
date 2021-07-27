import dayjs from "dayjs";
import { weekday } from "dayjs/plugin/weekday";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

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

    const url =
      BASE_URL +
      "/" +
      new URLSearchParams({ startDate, endDate, dateInterval });

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

    const url =
      BASE_URL +
      "/" +
      new URLSearchParams({ startDate, endDate, dateInterval });

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
  dayObjects: [], // {day: {day object from db}, loading: 'PENDING'/'IDLE'}
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
        dayObjects: [],
      };
    },
    setActiveDate: (state, action) => {
      const currentDate = action.payload;
      let dayName = dayjs(currentDate)
        .weekday(dayName.get("day"))
        .format("dddd");
      return {
        ...state,
        activeDay: currentDate,
        activeDayName: dayName,
        calendarLoadingStatus: "IDLE",
      };
    },
    setDayOffset: (state, action) => {
      return {
        ...state,
        dayOffset: action.payload,
        calendarLoadingStatus: "IDLE",
      };
    },
    addPrevJournalItems: (state, action) => {
      const { journalItems, dateInterval } = action.payload;
      return {
        ...state,
        [`${dateInterval}Objects`]: [
          {
            day: journalItems,
            loadingStatus: 'IDLE',
          },
          ...state[`${dateInterval}Objects`],
        ],
      };
    },
    addNextJournalItems: (state, action) => {
      const { journalItems, dateInterval } = action.payload;
      console.log('dayObjects', current(`${dateInterval}Objects`))
      return {
        ...state,
        [`${dateInterval}Objects`]: [
          ...state[`${dateInterval}Objects`],
          {
            day: journalItems,
            loadingStatus: "IDLE",
          },
        ],
      };
    },
    setJournalItemLoadingStatus: (state, action) => {
      const { journalItem } = action.payload;
      return {
        ...state,
      };
    },
  },
  extraReducers: {
    [getJournalItems.pending]: (state, action) => {
      state.journalItems = [];
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

export const {
  setCurrentDate,
  setDayOffset,
  addNextJournalItems,
  addPrevJournalItems,
} = CalendarSlice.actions;

export default CalendarSlice.reducer;
