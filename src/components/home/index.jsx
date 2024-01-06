import React, { useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import { IdProvider } from "./IdContext";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <IdProvider>
        <div className="">
          <div className="MainSidebar">
            <Sidebar />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </IdProvider>
    </>
  );
};
export default Dashboard;
