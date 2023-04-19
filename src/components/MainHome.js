import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./styles.css";

const MainHome = () => {
  return (
    <div className="main-home">
      <div className="nav">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default MainHome;
