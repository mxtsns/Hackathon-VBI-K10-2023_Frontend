import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { userState } from "./type";

export const USER_REDUCER = "user";

const initialState: userState = {
  accountId: "",
  logged: false,
};

const userSlice = createSlice({
  name: USER_REDUCER,
  initialState: initialState,
  reducers: {
    setAccountId(state, action: PayloadAction<string>) {
      state.accountId = action.payload;
    },
    setLogged(state) {
      state.logged = true;
    },
  },
});

const currentAccountId = (state: RootState) => {
  return state.user.accountId;
};

export const userAction = {
  ...userSlice.actions,
};

export const userReducer = userSlice.reducer;
