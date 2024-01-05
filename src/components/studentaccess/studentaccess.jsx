import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const StudentAccess = () => {
  const [data, setData] = useState();
  const [subjectdata, setSubjectData] = useState();
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
  const subjectList = () => {
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
        setSubjectData(data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  };
  useEffect(() => {
    refreshList();
    subjectList();
  }, []);

  const formik = useFormik({
    initialValues: {
      STUDENT_ID: "",
      NAME: "",
      Subjects: [],
      Status: "A",
      Created_By: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const storedToken = localStorage.getItem("access_token");
      const StudentId = localStorage.getItem("User");
      try {
        const response = await fetch(
          `${API_URL}Student/SaveStudentToSubjLink?StudentID=${StudentId}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify([values]),
          }
        );

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
                <Link to={"students"}>Student Details</Link>
              </li>
            </ol>
          </div>
          {/* row */}
          <div id="page-container">
            <div className="row mb-4">
              <div className="col-12 mt-3 mb-1">
                <h4 className="text-uppercase">Add Student Details</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 bgModal">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">Select Student</label>
                      <select
                        className="inputField"
                        name="STUDENT_ID"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const selectedStudent = data.find(
                            (subject) => subject.STUDENT_ID === e.target.value
                          );
                          formik.setFieldValue(
                            "NAME",
                            selectedStudent?.NAME || ""
                          );
                        }}
                        value={formik.values.STUDENT_ID}>
                        <option value="">Select Student</option>
                        {data &&
                          data.map((subject) => (
                            <option
                              key={subject.STUDENT_ID}
                              value={subject.STUDENT_ID}>
                              {subject.NAME}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">Select Subject</label>
                      <Select
                        className=""
                        name="Subjects"
                        isMulti
                        options={
                          subjectdata
                            ? subjectdata.map((subject) => ({
                                value: subject.Subject_ID,
                                label: subject.Subject_Name,
                              }))
                            : []
                        }
                        onChange={(selectedOptions) => {
                          formik.setFieldValue("Subjects", selectedOptions);
                        }}
                        value={formik.values.Subjects}
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
          {/* <div className="row">
            <div className="col-lg-6">Left</div>
            <div className="col-lg-6">Right</div>
          </div> */}
        </div>
      </div>
    </>
  );
};
