import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../utils";

export const Students = () => {
  const [editdata, setEditData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const storedToken = localStorage.getItem("access_token");

          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          };
          const response = await fetch(
            `${API_URL}Student/GetStudentDetailsByID/${id}`,
            {
              headers: headers,
            }
          );
          if (response.ok) {
            const data = await response.json();
            setEditData(data);
          } else {
            console.error(
              "Error fetching student details:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching student details:", error.message);
        }
      }
    }

    fetchData();
  }, [id]);
  useEffect(() => {
    if (editdata && editdata.length > 0) {
      formik.setValues({
        STUDENT_ID: editdata[0].STUDENT_ID,
        NAME: editdata[0].NAME,
        MOBILE: editdata[0].MOBILE,
        MAIL: editdata[0].MAIL,
        ADDRESS: editdata[0].ADDRESS,
        SECURITY_QUESTION: editdata[0].SECURITY_QUESTION,
        SECURITY_ANSWER: editdata[0].SECURITY_ANSWER,
        Status: editdata[0].Status,
        IDNO: editdata[0].IDNO,

      });
    }
  }, [editdata]);
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
            <div className="d-flex justify-content-end gap-2">
              <button className="Submitbutton mt-0 approved" type="submit">
                Approved
              </button>
              <button
                className="Submitbutton mt-0 approved"
                type="submit"
                onClick={() =>
                  navigate(`/home/employee/edit/${row.STUDENT_ID}`, {
                    replace: true,
                  })
                }>
                Edit
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end gap-2">
              <button
                className="Submitbutton mt-0 Notapproved"
                type="submit"
                onClick={() => handleApprove(row)}>
                Pending
              </button>
              <button
                className="Submitbutton mt-0 approved"
                type="submit"
                onClick={() =>
                  navigate(`/home/employee/edit/${row.STUDENT_ID}`, {
                    replace: true,
                  })
                }>
                Edit
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
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      IDNO: "",
      Qualification: "",
      Dateofbirth: "",
      DateOfJoining: "",
      STUDENT_TYPE: "",
      EXPERIENCE: "",
      BankName: "",
      IFSCCode: "",
      BankAccntNo: "",
      PAnNo: "",
      IMAGE_PATH: "",
      Status: "A",
      Created_By: "Tarun",
    },

    onSubmit: async (values, { resetForm }) => {
      const storedToken = localStorage.getItem("access_token");
      try {
        const response = await fetch(API_URL + "Student/UpdateStudent", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify([values]),
        });

        const result = await response.json();
        alert("Updated Successfully");
        navigate(`/home/employee`);
        refreshList();
        resetForm();
      } catch (error) {
        alert("Please Try again");
      }
    },
  });

  const tableData = {
    columns,
    data,
  };
  const handleImageChange = (event) => {
    // Access the file from the input
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result attribute contains a data: URL representing the file's data as a base64 encoded string
        formik.setFieldValue("IMAGE_PATH", reader.result);
      };
      // Read the file as a Data URL
      reader.readAsDataURL(file);
    }
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
                <Link to={"/home/employee"}>
                  {id ? "Edit Employee Details" : "Employee Details"}
                </Link>
              </li>
            </ol>
          </div>
          {/* row */}
          <div id="page-container">
            {id ? (
              <>
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6 bgModal">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row">
                        <div className="col-lg-4 mb-2">
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
                        <div className="col-lg-4 mb-2">
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
                        <div className="col-lg-4 mb-2">
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

                        <div className="col-lg-4 mb-2">
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
                        <div className="col-lg-4 mb-2">
                          <label className="inputFieldLabel">ID Number</label>
                          <input
                            type="text"
                            name="IDNO"
                            id="IDNO"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.IDNO}
                          />
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label className="inputFieldLabel">
                            Qualification
                          </label>
                          <input
                            type="text"
                            name="Qualification"
                            id="Qualification"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.Qualification}
                          />
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label className="inputFieldLabel">
                            Date of birth
                          </label>
                          <input
                            type="date"
                            name="Dateofbirth"
                            id="Dateofbirth"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.Dateofbirth}
                          />
                        </div>
                        <div
                          className="col-lg-4 mb-2
                        ">
                          <label className="inputFieldLabel">
                            Date of Joining
                          </label>
                          <input
                            type="date"
                            name="DateOfJoining"
                            id="DateOfJoining"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.DateOfJoining}
                          />
                        </div>
                        <div
                          className="col-lg-4 mb-2
                        ">
                          <label className="inputFieldLabel">EXPERIENCE</label>
                          <input
                            type="number"
                            name="EXPERIENCE"
                            id="EXPERIENCE"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.EXPERIENCE}
                          />
                        </div>
                        <div
                          className="col-lg-4 mb-2
                        ">
                          <label className="inputFieldLabel">Bank Name</label>
                          <input
                            type="text"
                            name="BankName"
                            id="BankName"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.BankName}
                          />
                        </div>
                        <div
                          className="col-lg-4 mb-2
                        ">
                          <label className="inputFieldLabel">IFSC Code</label>
                          <input
                            type="text"
                            name="IFSCCode"
                            id="IFSCCode"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.IFSCCode}
                          />
                        </div>
                        <div
                          className="col-lg-4 mb-2
                        ">
                          <label className="inputFieldLabel">
                            Bank Account Number
                          </label>
                          <input
                            type="text"
                            name="BankAccntNo"
                            id="BankAccntNo"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.BankAccntNo}
                          />
                        </div>
                        <div
                          className="col-lg-4 mb-2
                        ">
                          <label className="inputFieldLabel">Pan Number</label>
                          <input
                            type="text"
                            name="PAnNo"
                            id="PAnNo"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.PAnNo}
                          />
                        </div>
                        <div
                          className="col-lg-8 mb-2
                        ">
                          <label className="inputFieldLabel">
                            Upload Image
                          </label>
                          <input
                            type="file"
                            name="IMAGE_PATH"
                            id="IMAGE_PATH"
                            className="inputField"
                            onChange={handleImageChange}
                            // value={formik.values.IMAGE_PATH}
                          />
                        </div>
                        {/* <div className="col-lg-6">
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
                        </div> */}
                        {/* <div className="col-lg-6">
                          <label className="inputFieldLabel">
                            Security Answer
                          </label>
                          <input
                            type="text"
                            name="SECURITY_ANSWER"
                            id="SECURITY_ANSWER"
                            className="inputField"
                            onChange={formik.handleChange}
                            value={formik.values.SECURITY_ANSWER}
                          />
                        </div> */}
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
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
