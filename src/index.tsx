import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/homepage";
import View from "./page/view";
import Upload from "./page/upload";
import User from "./page/user";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/market" replace />} />
          <Route path="/" element={<App />}>
            <Route path="/market" element={<HomePage />} />
            <Route path="view/:tokenId" element={<View />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
