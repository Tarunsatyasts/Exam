import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { API_URL } from "../utils";

export const Reports = () => {
  const columns = [
    {
      name: "User Id",
      selector: "Userid",
      sortable: true,
    },
    {
      name: "User Name",
      selector: "UserName",
      sortable: true,
    },
    {
      name: "Login Date",
      selector: "LogInDate",
      sortable: true,
      cell: (row) => (
        <span>{row.LogInDate === null ? "Empty" : row.LogInDate}</span>
      ),
    },
    {
      name: "Login Time",
      selector: "LogInTime",
      sortable: true,
      cell: (row) => (
        <span>{row.LogInTime === null ? "Empty" : row.LogInTime}</span>
      ),
    },
    {
      name: "LogOut Date",
      selector: "LogOutDate",
      sortable: true,
      cell: (row) => (
        <span>{row.LogOutDate === null ? "Empty" : row.LogOutDate}</span>
      ),
    },
    {
      name: "LogOut Time",
      selector: "LogOutTime",
      sortable: true,
      cell: (row) => (
        <span>{row.LogOutTime === null ? "Empty" : row.LogOutTime}</span>
      ),
    },
    // {
    //     name: "Actions",
    //     cell: (row) => (
    //         <div className="EditBtn">
    //             <div className="d-flex justify-content-end ">
    //                 <button
    //                     className="Submitbutton mt-0 approved"
    //                     type="submit"
    //                     onClick={() => handleApprove(row)}>
    //                     Edit
    //                 </button>
    //             </div>
    //         </div>
    //     ),
    // },
  ];

  const [data, setData] = useState();
  // const formatDate = (dateString) => {
  //   const parts = dateString;
  //   const datePart = parts;
  //   const [day, month, year] = datePart;
  //   return `${day}-${month}-${year}`;
  // };

  // const formatTime = (timeString) => {
  //   const time = new Date(`2000-01-01T${timeString}`);
  //   return time.toLocaleTimeString();
  // };

  const tableData = {
    columns,
    data,
  };
  const formik = useFormik({
    initialValues: {
      date: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const storedToken = localStorage.getItem("access_token");

      try {
        const storedToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("User");
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        };
        const dateString =
          values.date instanceof Date ? values.date.toISOString() : values.date;
        const response = await fetch(
          `${API_URL}Report/GetLogDetails/${dateString}`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log("-=-=-=-=-=-=-==-=-=-==-=", data);
        } else {
          console.error("Error fetching student details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student details:", error.message);
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
                <Link to={"students"}>Reports</Link>
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
                    <div className="col-lg-12">
                      <label className="inputFieldLabel">Select Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="inputField"
                        placeholder="date"
                        onChange={formik.handleChange}
                        value={formik.values.date}
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

            <section>
              <div className="row">
                <div className="col-lg-12">
                  <div className="main dataTable">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={columns}
                        data={data}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
