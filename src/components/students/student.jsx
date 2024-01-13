import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const Students = () => {
  const columns = [
    {
      name: "Employee Id",
      selector: "STUDENT_ID",
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: "NAME",
      sortable: true,
    },
    {
      name: "Mobile",
      selector: "MOBILE",
    },
    {
      name: "Email",
      selector: "MAIL",
    },
    {
      name: "Address",
      selector: "ADDRESS",
    },

    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.Status === "A" ? (
            <div className="d-flex justify-content-end ">
              <button className="Submitbutton mt-0 approved" type="submit">
                Approved
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end ">
              <button
                className="Submitbutton mt-0 Notapproved"
                type="submit"
                onClick={() => handleApprove(row)}>
                Approved
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const [data, setData] = useState();
  const handleApprove = async (row) => {
    const storedToken = localStorage.getItem("access_token");
    try {
      const formData = new URLSearchParams();
      formData.append("StudentID", row.STUDENT_ID);
      formData.append("Student_Name", row.NAME);

      const response = await fetch(`${API_URL}Student/GetStudentMailStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${storedToken}`,
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("API response:", responseData);

        refreshList();
      } else {
        const errorData = await response.json();
        alert("Error approving student:", errorData.message);
      }
    } catch (error) {
      alert("Error approving student:", error.message);
    }
  };

  const refreshList = () => {
    const storedToken = localStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    fetch(API_URL + "Student/GetStudentDetails", {
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

  const formik = useFormik({
    initialValues: {
      NAME: "",
      MOBILE: "",
      MAIL: "",
      ADDRESS: "",
      SUBJECT: "",
      SECURITY_QUESTION: "",
      SECURITY_ANSWER: "",
      Status: "A",
      Created_By: "Tarun",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(API_URL + "Student/SaveStudent", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.access_token}`,
          },
          body: JSON.stringify([values]),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Created Successfully");

          refreshList();
          resetForm();
        } else {
          // Error
          alert("Failed: " + result.message);
          console.log("sjfhsgfhg", values);
          console.error("Create failed:", result.message);
        }
      } catch (error) {
        // Fetch error
        alert("Error: " + error.message);
        console.error("Fetch error:", error.message);
      }
    },
  });

  const tableData = {
    columns,
    data,
  };
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
                <Link to={"students"}>Employee Details</Link>
              </li>
            </ol>
          </div>
          {/* row */}
          <div id="page-container">
            {/* <div className="row mb-4">
              <div className="col-12 mt-3 mb-1">
                <h4 className="text-uppercase">Add Student Details</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 bgModal">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Name</label>
                      <input
                        type="text"
                        name="NAME"
                        id="NAME"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.NAME}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Email</label>
                      <input
                        type="email"
                        name="MAIL"
                        id="MAIL"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.MAIL}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Number</label>
                      <input
                        type="number"
                        name="MOBILE"
                        id="MOBILE"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.MOBILE}
                      />
                    </div>

                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Subject</label>
                      <input
                        type="text"
                        name="SUBJECT"
                        id="SUBJECT"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.SUBJECT}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">
                        Security Question
                      </label>
                      <input
                        type="text"
                        name="SECURITY_QUESTION"
                        id="SECURITY_QUESTION"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.SECURITY_QUESTION}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Security Answer</label>
                      <input
                        type="text"
                        name="SECURITY_ANSWER"
                        id="SECURITY_ANSWER"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.SECURITY_ANSWER}
                      />
                    </div>
                    <div className="col-lg-12">
                      <label className="inputFieldLabel">Address</label>
                      <textarea
                        name="ADDRESS"
                        id="ADDRESS"
                        className="textArea"
                        onChange={formik.handleChange}
                        value={formik.values.ADDRESS}></textarea>
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
            </div> */}

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
          {/* <div className="row">
            <div className="col-lg-6">Left</div>
            <div className="col-lg-6">Right</div>
          </div> */}
        </div>
      </div>
    </>
  );
};
