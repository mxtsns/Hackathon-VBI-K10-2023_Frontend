import { Contract, keyStores } from "near-api-js";
import { connect } from "near-api-js/lib/connect";
import { WalletConnection } from "near-api-js/lib/wallet-account";
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CONTRACT_NAME, MARKET_CONTRACT_NAME } from "../../config";
import { useAppDispatch, useAppSelector } from "../../store";
import { userAction } from "../../store/userReducer";
import { walletAction } from "../../store/walletReducer";
import SearchBar from "../searchBar";

// declare const window: any;

const Header = () => {
  const param = useLocation();

  const accountId = useAppSelector((state) => state.user.accountId);
  const isLoggedIn = useAppSelector((state) => state.user.logged);

  return (
    <div className="flex justify-between gap-x-20 my-[3rem] px-[3rem]">
      <li
        className={`list-none  flex font-roboto-slab text-2xl ${
          param.pathname == "/market" ? "text-lightGray" : "text-lightGray/40"
        } font-bold items-center gap-x-1 hover:text-lightGray hover:cursor-pointer`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="stroke-current"
        >
          <path
            d="M14 4.66666L5.83337 8.16666L14 11.6667L22.1667 8.16666L14 4.66666Z"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.83104 11.6273L5.43945 13.0809C5.07177 13.2384 4.83337 13.6 4.83337 14C4.83337 14.4 5.07177 14.7616 5.43945 14.9191L13.6061 18.4191C13.8577 18.527 14.1424 18.527 14.394 18.4191L22.5606 14.9191C22.9283 14.7616 23.1667 14.4 23.1667 14C23.1667 13.6 22.9283 13.2384 22.5606 13.0809L19.169 11.6273L16.6304 12.7153L19.6281 14L14 16.412L8.37197 14L11.3696 12.7153L8.83104 11.6273Z"
            fill-opacity="0.8"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.83104 17.4607L5.43945 18.9142C5.07177 19.0718 4.83337 19.4333 4.83337 19.8333C4.83337 20.2334 5.07177 20.5949 5.43945 20.7525L13.6061 24.2525C13.8577 24.3603 14.1424 24.3603 14.394 24.2525L22.5606 20.7525C22.9283 20.5949 23.1667 20.2334 23.1667 19.8333C23.1667 19.4333 22.9283 19.0718 22.5606 18.9142L19.169 17.4607L16.6304 18.5486L19.6281 19.8333L14 22.2454L8.37197 19.8333L11.3696 18.5486L8.83104 17.4607Z"
            fill-opacity="0.8"
          />
        </svg>
        <Link to="/market">Market</Link>
      </li>
      <li
        className={`list-none flex font-roboto-slab text-2xl           ${
          param.pathname == "/upload" ? "text-lightGray" : "text-lightGray/40"
        } font-bold items-center gap-x-1 hover:text-lightGray hover:cursor-pointer`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M24.5 14H20.9037C20.3797 14 20.1178 14 19.8967 14.1183C19.6756 14.2367 19.5302 14.4546 19.2396 14.8906L18.0937 16.6094C17.8031 17.0454 17.6578 17.2633 17.4367 17.3817C17.2156 17.5 16.9536 17.5 16.4296 17.5H11.5704C11.0464 17.5 10.7844 17.5 10.5633 17.3817C10.3422 17.2633 10.1969 17.0454 9.90627 16.6094L8.7604 14.8906C8.46976 14.4546 8.32443 14.2367 8.10334 14.1183C7.88225 14 7.62026 14 7.0963 14H3.5"
            stroke-opacity="0.8"
            stroke-width="2"
          />
          <path
            d="M9.91669 9.33334L14 5.83334M14 5.83334L18.0834 9.33334M14 5.83334L14 14"
            stroke-opacity="0.8"
            stroke-width="2"
          />
          <path
            d="M5.83333 10.5L3.79289 12.5404C3.60536 12.728 3.5 12.9823 3.5 13.2475V20.1667C3.5 21.2712 4.39543 22.1667 5.5 22.1667H22.5C23.6046 22.1667 24.5 21.2712 24.5 20.1667V13.2475C24.5 12.9823 24.3946 12.728 24.2071 12.5404L22.1667 10.5"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <Link to="/upload">Upload</Link>
      </li>
      <SearchBar />
      {isLoggedIn ? (
        <div className="">
          <li
            className={`list-none flex text-lightGray font-roboto-slab text-2xl font-bold items-center gap-x-1 hover:text-lightGray hover:cursor-pointer `}
          >
            <Link to="/user">{accountId}</Link>
          </li>
        </div>
      ) : (
        <button
          onClick={() =>
            window.walletConnection.requestSignIn({
              contractId: "market_contract.flyingtung.testnet",
            })
          }
          className="h-[2rem] bg-caribbean rounded-[3.125rem] w-[10rem] font-roboto-slab text-xl font-normal"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;
