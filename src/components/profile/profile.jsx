import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../utils";

export const Profile = () => {
  const [data, setData] = useState();
  const tokenId = localStorage.getItem("Id");
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
        `${API_URL}Student/GetStudentDetailsByID/${StudentId}`,
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
              {tokenId === "001" ? (
                <>
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
                              <b>Admin</b>
                            </h4>
                          </div>
                          <div className="col">
                            <h6 className="card-subtitle mb-2 text-muted">
                              <p className="card-text text-muted small m-0 d-flex align-items-center">
                                <img
                                  src="https://img.icons8.com/metro/26/000000/star.png"
                                  className="mr-1 "
                                  width={19}
                                  height={19}
                                  id="star"
                                />
                                Mobile : +91 XXXXX XXXXX
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
                            <small> Email : admin@gmail.com</small>
                          </a>
                          <i className="mdi mdi-settings-outline" />
                          <a
                            href="#"
                            className="
                   btn-outlined btn-black text-muted"
                            style={{ textDecoration: "none" }}>
                            <img
                              src="https://img.icons8.com/metro/26/000000/link.png"
                              width={17}
                              height={17}
                              id="plus"
                            />
                            &nbsp;
                            <small>Address : msanty tech XXXXXXX</small>{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                              <p className="card-text text-muted small m-0 d-flex align-items-center">
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
                            <p
                              className="display-inline-block m-0"
                              style={{
                                fontWeight: "600",
                                textTransform: "lowercase",
                                color: "#000",
                              }}>
                              {" "}
                              Email : {data?.MAIL}
                            </p>
                          </a>
                          <i className="mdi mdi-settings-outline" />
                          <a
                            href="#"
                            className="
                   btn-outlined btn-black text-muted"
                            style={{ textDecoration: "none" }}>
                            <img
                              src="https://img.icons8.com/metro/26/000000/link.png"
                              width={17}
                              height={17}
                              id="plus"
                            />
                            &nbsp;
                            <p
                              className="display-inline-block m-0"
                              style={{
                                fontWeight: "600",
                                textTransform: "lowercase",
                                color: "#000",
                              }}>
                              Address :{data?.ADDRESS}
                            </p>{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
