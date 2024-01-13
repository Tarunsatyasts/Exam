import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const Answers = () => {
  const [data, setData] = useState();
  const [lessondata, setLessonData] = useState();
  const [questiondata, setQuestionData] = useState();
  const [numberOfOptions, setNumberOfOptions] = useState(0);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setNumberOfOptions(value);
  };

  const generateOptionFields = () => {
    const optionFields = [];
    for (let i = 0; i < numberOfOptions; i++) {
      optionFields.push(
        <div key={i} className="col-lg-12 mt-2 mb-2">
          <label className="inputFieldLabel">Option {i + 1}</label>
          <input
            type="text"
            name={`OPTION_NAME_${i}`}
            id={`OPTION_NAME_${i}`}
            className="inputField"
            onChange={formik.handleChange}
            value={formik.values[`OPTION_NAME_${i}`] || ""}
          />
        </div>
      );
    }
    return optionFields;
  };

  const columns = [
    {
      name: "Question ID",
      selector: "QUESTION_ID",
      sortable: true,
    },
    {
      name: "Question Name",
      selector: "Question_name",
      sortable: true,
    },
    {
      name: "Answer Type",
      selector: "ANSWER_TYPE",
    },
    {
      name: "Selected Answer Id",
      selector: "ANSWER_ID",
    },
    {
      name: "Option",
      selector: "OPTION_NAME",
    },
    {
      name: "Task Name",
      selector: "Lession_name",
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

  const answersList = () => {
    const storedToken = localStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    fetch(API_URL + "Answer/GetOptions", {
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
  // const refreshList = () => {
  //   const storedToken = localStorage.getItem("access_token");
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${storedToken}`,
  //   };

  //   fetch(API_URL + "Question/GetQuestionMaster", {
  //     headers: headers,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuestionData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching student details:", error);
  //     });
  // };
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

  useEffect(() => {
    answersList();
    // refreshList();
    lessonList();
  }, []);
  const formik = useFormik({
    initialValues: {
      Question_ID: "",
      Question_name: "",
      Lession_ID: "",
      Lession_name: "",
      ANSWER_ID: "",
      ANSWER_TYPE: "radio",
      OPTION_ID: "",
      OPTION_NAME: "",
      VIDEO_LINK: "",
      STATUS: "",
      SEQNO: "",
      EDITED_BY: "",
      CREATED_BY: "",
    },

    onSubmit: async (values) => {
      const storedToken = localStorage.getItem("access_token");

      // Remove OPTION_NAME_x fields from values
      const cleanValues = { ...values };
      for (let i = 0; i < numberOfOptions; i++) {
        delete cleanValues[`OPTION_NAME_${i}`];
      }

      const optionData = [];
      for (let i = 1; i <= numberOfOptions; i++) {
        optionData.push({
          ...cleanValues,
          OPTION_ID: i.toString(),
          OPTION_NAME: values[`OPTION_NAME_${i - 1}`] || "",
        });
      }

      try {
        const response = await fetch(API_URL + "Answer/SaveOptions", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(optionData),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Created Successfully");
        } else {
          alert("Failed: " + result.message);
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

  // Lesson onchange
  const handleLessonChange = async (e) => {
    formik.handleChange(e);
    const selectedLessonID = e.target.value;

    try {
      const storedToken = localStorage.getItem("access_token");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      };

      const response = await fetch(
        `${API_URL}Question/GetQuestionMasterByLession?Lession_ID=${selectedLessonID}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQuestionData(data);

        // Set Lession_name in formik state
        const selectedLesson = lessondata.find(
          (lesson) => lesson.Lession_ID === selectedLessonID
        );
        formik.setFieldValue(
          "Lession_name",
          selectedLesson?.Lession_name || ""
        );
      } else {
        console.error("Failed to fetch questions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.message);
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
                <Link to={"students"}>Add Answers</Link>
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
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">Select Task</label>
                      <select
                        className="inputField"
                        name="Lession_ID"
                        onChange={handleLessonChange}
                        // onChange={(e) => {
                        //   formik.handleChange(e);
                        //   const selectedLesson = lessondata.find(
                        //     (lesson) => lesson.Lession_ID === e.target.value
                        //   );
                        //   formik.setFieldValue(
                        //     "Lession_name",
                        //     selectedLesson?.Lession_name || ""
                        //   );
                        // }}
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
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel"> Select Type</label>
                      <select
                        className="inputField"
                        name="ANSWER_TYPE"
                        disabled
                        onChange={formik.handleChange}
                        value={formik.values.ANSWER_TYPE}>
                        <option value="radio" selected>
                          radio
                        </option>
                      </select>
                    </div>
                    <div className="col-lg-12">
                      <label className="inputFieldLabel">Select Question</label>
                      <select
                        className="inputField"
                        name="Question_ID"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const selectedQuestion = questiondata.find(
                            (question) =>
                              question.Question_ID === e.target.value
                          );
                          formik.setFieldValue(
                            "Question_name",
                            selectedQuestion?.Question_name || ""
                          );
                        }}
                        value={formik.values.Question_ID}>
                        <option value="">Select Question</option>
                        {questiondata &&
                          questiondata.map((question) => (
                            <option
                              key={question.Question_ID}
                              value={question.Question_ID}>
                              {question.Question_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">
                        Enter Option's for Question
                      </label>
                      <input
                        type="number"
                        name="numberOfOptions"
                        id="numberOfOptions"
                        className="inputField"
                        onChange={handleInputChange}
                        value={numberOfOptions}
                      />
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">
                        Enter Answer Option
                      </label>
                      <input
                        type="text"
                        name="ANSWER_ID"
                        id="ANSWER_ID"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.ANSWER_ID}
                      />
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      {generateOptionFields()}
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
