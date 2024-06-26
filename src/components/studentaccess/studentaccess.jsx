import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import * as Yup from "yup";
import { API_URL } from "../utils";

export const StudentAccess = () => {
  const columns = [
    {
      name: "Employee Id",
      selector: "EMPID",
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: "EMPNAME",
      sortable: true,
    },
    {
      name: "Subject Id",
      selector: "SUBJECT_ID",
      sortable: true,
    },
    {
      name: "Subject Name",
      selector: "SUbject_name",
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div className="EditBtn">
    //       <div className="d-flex justify-content-end ">
    //         <button
    //           className="Submitbutton mt-0 approved"
    //           type="submit"
    //           // onClick={() => OnEdit(row.Subject_ID)}
    //           onClick={() =>
    //             navigate(`/home/technology/edit/${row.Subject_ID}`, {
    //               replace: true,
    //             })
    //           }>
    //           Edit
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  const [data, setData] = useState();
  const [empdata, setEmpData] = useState();
  const [subjectdata, setSubjectData] = useState();
  const tableInfo = () => {
    const storedToken = localStorage.getItem("access_token");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    };

    fetch(API_URL + "Student/GetEmployeeDetailswithSubject", {
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
  const tableData = {
    columns,
    data,
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
        setEmpData(data);
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
    tableInfo();
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
          `${API_URL}Student/SaveStudentToSubjLink`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify(values),
          }
        );

        const result = await response;

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
                <Link to={"/home"}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={"students"}>Employee Details</Link>
              </li>
            </ol>
          </div>
          {/* row */}
          <div id="page-container">
            <div className="row mb-4">
              <div className="col-12 mt-3 mb-1">
                <h4 className="text-uppercase">Add Employee Details</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 bgModal">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">Select Employee</label>
                      <select
                        className="inputField"
                        name="STUDENT_ID"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const selectedStudent = empdata.find(
                            (subject) => subject.STUDENT_ID === e.target.value
                          );
                          formik.setFieldValue(
                            "NAME",
                            selectedStudent?.NAME || ""
                          );
                        }}
                        value={formik.values.STUDENT_ID}>
                        <option value="">Select Employee</option>
                        {empdata &&
                          empdata.map((subject) => (
                            <option
                              key={subject.STUDENT_ID}
                              value={subject.STUDENT_ID}>
                              {subject.NAME}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6 mt-2 mb-2">
                      <label className="inputFieldLabel">
                        Select Technology
                      </label>
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
    </>
  );
};
