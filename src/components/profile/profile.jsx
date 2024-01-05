import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const Profile = () => {
  const [data, setData] = useState();

  const refreshList = async () => {
    try {
      const storedToken = localStorage.getItem("access_token");
      const StudentId = localStorage.getItem("User");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      };

      const response = await fetch(
        `${API_URL}Student/GetStudentDetailsByID?StudentID=${StudentId}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        console.log("-=-=-=-=-=-=-==-=-=-==-=", data);
      } else {
        console.error("Error fetching student details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching student details:", error.message);
    }
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={"students"}>Profile</Link>
              </li>
            </ol>
          </div>
          {/* row */}
          <div id="page-container">
            <div className="container">
              <div className="card mt-5 pt-2 active pb-0 px-3">
                <div className="card-body ">
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg"
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="col-12 ">
                        <h4 className="card-title mb-2">
                          <b>{data?.NAME}</b>
                        </h4>
                      </div>
                      <div className="col">
                        <h6 className="card-subtitle mb-2 text-muted">
                          <p className="card-text text-muted small m-0 d-flex ">
                            <img
                              src="https://img.icons8.com/metro/26/000000/star.png"
                              className="mr-1 "
                              width={19}
                              height={19}
                              id="star"
                            />
                            Mobile : {data?.MOBILE}
                          </p>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-white px-0 ">
                  <div className="row">
                    <div className=" col-md-auto ">
                      <a
                        href="#"
                        className="btn btn-outlined btn-black text-muted bg-transparent"
                        data-wow-delay="0.7s">
                        <img
                          src="https://img.icons8.com/ios/50/000000/settings.png"
                          width={19}
                          height={19}
                        />{" "}
                        <small> Email : {data?.MAIL}</small>
                      </a>
                      <i className="mdi mdi-settings-outline" />
                      <a
                        href="#"
                        className="
                   btn-outlined btn-black text-muted">
                        <img
                          src="https://img.icons8.com/metro/26/000000/link.png"
                          width={17}
                          height={17}
                          id="plus"
                        />
                        <small>Address :{data?.ADDRESS}</small>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
