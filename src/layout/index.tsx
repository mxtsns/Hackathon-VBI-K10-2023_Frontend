import React, { ReactNode, ReactPortal } from "react";
import Header from "../components/header";

interface props {
  children: ReactNode;
}

const Layout = (props: props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
