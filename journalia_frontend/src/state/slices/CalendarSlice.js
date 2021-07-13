import dayjs from "dayjs";
import { weekday } from "dayjs/plugin/weekday";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8000";
const headers = {
  "Content-Type": "application/json",
};

// requestData: {dateStart, dateEnd}
export const getJournalItems = createAsyncThunk(
  "calendar/getJournalItems",
  async (accessToken, { rejectWithValue }) => {
    const startDate = dayjs()
      .subtract(1, "day")
      .startOf("day")
      .format("MMMM DD YYYY HH:mm:ss");

    const endDate = dayjs()
      .add(1, "day")
      .endOf("day")
      .format("MMMM DD YYYY HH:mm:ss");

    console.log(typeof startDate);

    const url =
      BASE_URL +
      "/" +
      new URLSearchParams({
        start_date: startDate,
        date_range: 'day',
      });

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

const initialState = {
  journalItems: null,
  calendarLoadingStatus: "PENDING",
  currentDate: null,
  dayName: null,
  dayOffset: 0,
};

const CalendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      const currentDate = action.payload;
      let dayName = dayjs(currentDate);
      dayName = dayName.weekday(dayName.get("day")).format("dddd");
      console.log("dayname", dayName);
      return {
        ...state,
        currentDate: currentDate,
        dayName: dayName,
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
  },
  otherReducers: {
    [getJournalItems.pending]: (state, action) => {
      return {
        calendarLoadingStatus: "PENDING",
      };
    },
    [getJournalItems.fulfilled]: (state, action) => {
      return {
        journalItems: action.payload.journalItems,
        calendarLoadingStatus: "IDLE",
      };
    },
    [getJournalItems.rejected]: (state, action) => {
      return {
        journalItems: [],
        calendarLoadingStatus: "IDLE",
      };
    },
  },
});

export const { setCurrentDate, setDayOffset } = CalendarSlice.actions;

export default CalendarSlice.reducer;
