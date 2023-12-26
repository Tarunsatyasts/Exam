import React, { useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";

export const Dashboard = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);
  return (
    <>
      <div className="">
        <div className="MainSidebar">
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
