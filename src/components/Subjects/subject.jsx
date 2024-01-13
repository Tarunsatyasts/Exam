import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const Subjects = () => {
  const columns = [
    {
      name: "Technology Id",
      selector: "Subject_ID",
      sortable: true,
    },
    {
      name: "Technology Name",
      selector: "Subject_Name",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="EditBtn">
          <div className="d-flex justify-content-end ">
            <button
              className="Submitbutton mt-0 approved"
              type="submit"
              onClick={() => handleApprove(row)}>
              Edit
            </button>
          </div>
        </div>
      ),
    },
  ];

  const [data, setData] = useState();

  const refreshList = () => {
    const storedToken = localStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    fetch(API_URL + "Subject/GetSubjectDetails", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);
  const tableData = {
    columns,
    data,
  };
  const formik = useFormik({
    initialValues: {
      Subject_ID: "",
      Subject_Name: "",
      Status: "",
      CreatedBy: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const storedToken = localStorage.getItem("access_token");
      try {
        const response = await fetch(API_URL + "Subject/SaveSubject", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify([values]),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Created Successfully");
          refreshList();
        } else {
          alert("Failed: " + result.message);
          console.log("sjfhsgfhg", values);
          console.error("Create failed:", result.message);
        }
      } catch (error) {
        alert("Error: " + error.message);
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
                <Link to={"/"}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={"students"}>Add Technology</Link>
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
                      <label className="inputFieldLabel">Technology Name</label>
                      <input
                        type="text"
                        name="Subject_Name"
                        id="Subject_Name"
                        className="inputField"
                        placeholder="technology"
                        onChange={formik.handleChange}
                        value={formik.values.Subject_Name}
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
