import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const UserId = localStorage.getItem("User");
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      UserID: UserId,
    },

    onSubmit: async (values, { resetForm }) => {
      const storedToken = localStorage.getItem("access_token");
      try {
        const method = "POST";
        const response = await fetch(`${API_URL}Login/ChangePassword`, {
          method: method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(values),
        });
        const result = await response.json();

        if (response.ok) {
          alert("created Successfully");
          if (id) {
            navigate(`/home`);
          } else {
            navigate(`/home`);
          }
        } else {
          alert("Please try again");

          console.error("Create failed:", result.message);
        }
      } catch (error) {
        alert("Something went Wrong / check old password");
        console.error("Fetch error:", error.message);
      }
    },
  });

  return (
    <>
      <div className="content-body">
        <div className="">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/home"}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={"/home/password"}>Change Password</Link>
              </li>
            </ol>
          </div>
          {/* row */}
          <div id="page-container">
            {/* <div className="row mb-4">
              <div className="col-12 mt-3 mb-1">
                <h4 className="text-uppercase">Add Lesson Details</h4>
              </div>
            </div> */}
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 bgModal">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Old Password</label>
                      <input
                        type="text"
                        name="OldPassword"
                        id="OldPassword"
                        className="inputField"
                        placeholder="OldPassword "
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">New Password</label>
                      <input
                        type="text"
                        name="NewPassword"
                        id="NewPassword"
                        className="inputField"
                        placeholder="NewPassword "
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-end">
                      <button className="Submitbutton" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
