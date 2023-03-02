import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { walletState } from "./type";

export const WALLET_REDUCER = "wallet";

const initialState: walletState = {
  walletConnection: null,
  marketContract: null,
  nftContract: null,
};

const walletSlice = createSlice({
  name: WALLET_REDUCER,
  initialState: initialState,
  reducers: {
    setWalletConnection(state, action: PayloadAction<any>) {
      state.walletConnection = action.payload;
    },
    setMarketContract(state, action: PayloadAction<any>) {
      state.marketContract = action.payload;
    },
    setNftContract(state, action: PayloadAction<any>) {
      state.nftContract = action.payload;
    },
  },
});

export const walletAction = {
  ...walletSlice.actions,
};

export const walletReducer = walletSlice.reducer;
