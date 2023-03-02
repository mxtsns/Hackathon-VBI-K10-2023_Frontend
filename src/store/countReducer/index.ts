import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { countReducerState } from "./type";

export const COUNT_REDUCER = "count";

const initialState: countReducerState = {
  count: 0,
};

const countSlice = createSlice({
  name: COUNT_REDUCER,
  initialState: initialState,
  reducers: {
    increase(state) {
      state.count++;
    },
    decrease(state) {
      state.count--;
    },
  },
});

const getCount = (state: RootState) => {
  return state.count.count;
};

export const countSelector = {
  getCount,
};

export const countAction = {
  ...countSlice.actions,
};

export const countReducer = countSlice.reducer;
