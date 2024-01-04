import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const Questions = () => {
  const [data, setData] = useState();
  const [lessondata, setLessonData] = useState();
  const [subjectdata, setSubjectData] = useState();
  const columns = [
    {
      name: "Question ID",
      selector: "Question_ID",
      sortable: true,
    },
    {
      name: "Question Name",
      selector: "Question_name",
      sortable: true,
    },
    {
      name: "Subject Name",
      selector: "Subject_Name",
    },
    {
      name: "Lesson Name",
      selector: "Lession_Name",
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
        setSubjectData(data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  };
  const lessonList = () => {
    const storedToken = localStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    fetch(API_URL + "Lession/GetLessionDetails", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setLessonData(data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  };
  const QuestionList = () => {
    const storedToken = localStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    fetch(API_URL + "Question/GetQuestionMaster", {
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
    lessonList();
    QuestionList();
  }, []);
  const formik = useFormik({
    initialValues: {
      Question_ID: "",
      Question_name: "",
      Lession_ID: "",
      Lession_name: "",
      Subject_ID: "",
      Subject_Name: "",
      Status: "",
      CreatedBy: "",
    },

    onSubmit: async (values) => {
      const storedToken = localStorage.getItem("access_token");
      try {
        const response = await fetch(API_URL + "Question/SaveQuestion", {
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
                <Link to={"students"}>Add Questions</Link>
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
                      <label className="inputFieldLabel"> Question</label>
                      <input
                        type="text"
                        name="Question_name"
                        id="Question_name"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.Question_name}
                      />
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">Select Subject</label>
                      <select
                        className="inputField"
                        name="Subject_ID"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const selectedSubject = subjectdata.find(
                            (subject) => subject.Subject_ID === e.target.value
                          );
                          formik.setFieldValue(
                            "Subject_Name",
                            selectedSubject?.Subject_Name || ""
                          );
                        }}
                        value={formik.values.Subject_ID}>
                        <option value="">Select Subject</option>
                        {subjectdata &&
                          subjectdata.map((subject) => (
                            <option
                              key={subject.Subject_ID}
                              value={subject.Subject_ID}>
                              {subject.Subject_Name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">Select Lesson</label>
                      <select
                        className="inputField"
                        name="Lession_ID"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const selectedLesson = lessondata.find(
                            (lesson) => lesson.Lession_ID === e.target.value
                          );
                          formik.setFieldValue(
                            "Lession_Name",
                            selectedLesson?.Lession_Name || ""
                          );
                        }}
                        value={formik.values.Lession_ID}>
                        <option value="">Select Lesson</option>
                        {lessondata &&
                          lessondata.map((lesson) => (
                            <option
                              key={lesson.Lession_ID}
                              value={lesson.Lession_ID}>
                              {lesson.Lession_name}
                            </option>
                          ))}
                      </select>
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
