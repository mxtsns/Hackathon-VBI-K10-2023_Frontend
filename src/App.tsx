import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import { countAction } from "./store/countReducer";
import Header from "./components/header";
import Card from "./components/card";
import HomePage from "./page/homepage";
import View from "./page/view";
import { Outlet, Route, Routes } from "react-router-dom";
import * as buffer from "buffer";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { walletAction } from "./store/walletReducer";
import { CONTRACT_NAME, MARKET_CONTRACT_NAME } from "./config";
import { userAction } from "./store/userReducer";

window.Buffer = buffer.Buffer;
declare global {
  interface Window {
    walletConnection: any;
    marketContract: any;
    nftContract: any;
  }
}

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.count.count);

  const increase = () => {
    dispatch(countAction.increase());
  };
  const decrease = () => {
    dispatch(countAction.decrease());
  };

  const date: Date = new Date();
  const initContract = async () => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const connection = await connect({
      networkId: "testnet",
      keyStore: keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
    });

    window.walletConnection = new WalletConnection(connection, null);

    dispatch(walletAction.setWalletConnection(window.walletConnection));

    const account = window.walletConnection.account();

    window.marketContract = new Contract(account, MARKET_CONTRACT_NAME, {
      viewMethods: [
        "storage_minimum_balance",
        "storage_balance_of",
        "get_sales_by_nft_contract_id",
      ],
      changeMethods: ["storage_deposit", "offer", "storage_withdraw"],
    });
    window.nftContract = new Contract(account, CONTRACT_NAME, {
      viewMethods: ["nft_tokens_for_owner", "nft_tokens"],
      changeMethods: ["nft_approve", "nft_mint", "new_default_meta"],
    });

    dispatch(walletAction.setMarketContract(window.marketContract));
    dispatch(walletAction.setNftContract(window.nftContract));

    // let info = await window.walletConnection
    //   .account()
    //   .viewFunction(MARKET_CONTRACT_NAME, "get_sales_by_nft_contract_id", {
    //     nft_contract_id: CONTRACT_NAME,
    //     from_index: "0",
    //     limit: 64,
    //   });
    // console.log(info);

    if (window.walletConnection.isSignedIn()) {
      dispatch(userAction.setLogged());
      dispatch(userAction.setAccountId(window.walletConnection.getAccountId()));
    }
    console.log(account);
  };

  useEffect(() => {
    initContract();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
