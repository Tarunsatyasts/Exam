import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import { API_URL } from "../utils";
import * as Yup from "yup";

export const Lessons = () => {
  const [data, setData] = useState();
  const [subjdata, setSubjData] = useState();
  const [editdata, setEditData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
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
        setSubjData(data);
        console.log("-=-=-=-=-=-=-==-=-=-==-=", data);
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
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  };
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
            `${API_URL}Lession/GetLessionDetailsByLession/${id}`,
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
        Lession_ID: editdata[0].Lession_ID,
        Lession_name: editdata[0].Lession_name,
        Subject_ID: editdata[0].Subject_ID,
        Subject_Name: editdata[0].Subject_Name,
        Status: editdata[0].Status,
        VIDEO_LINK: editdata[0].VIDEO_LINK,
        CreatedBy: editdata[0].CreatedBy,
      });
    }
  }, [editdata]);
  useEffect(() => {
    refreshList();
    lessonList();
  }, []);
  const formik = useFormik({
    initialValues: {
      Lession_ID: "",
      Lession_name: "",
      Subject_ID: "",
      Subject_Name: "",
      Status: "",
      VIDEO_LINK: "",
      CreatedBy: "",
    },

    onSubmit: async (values) => {
      const storedToken = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `${API_URL}Lession/${id ? "Updatelession" : "SaveLession"}`,
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

        const result = await response.json();

        if (response.ok) {
          alert(`${id ? "Updated Successfully" : "Created Successfully"}`);
          if (id) {
            navigate(`/home/tasks`);
          } else {
            navigate(`/home/tasks`);
          }

          lessonList();
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
  const columns = [
    {
      name: "Task ID",
      selector: "Lession_ID",
      sortable: true,
    },
    {
      name: "Task Name",
      selector: "Lession_name",
      sortable: true,
    },
    {
      name: "Technology Name",
      selector: "Subject_Name",
      sortable: true,
    },
    {
      name: "Video Link",
      selector: "VIDEO_LINK",
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
              onClick={() =>
                navigate(`/home/tasks/edit/${row.Lession_ID}`, {
                  replace: true,
                })
              }>
              Edit
            </button>
          </div>
        </div>
      ),
    },
  ];
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
                <Link to={"/home"}>Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={"/home/tasks"}>
                  {id ? "Edit Tasks" : "Add Tasks"}
                </Link>
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
                      <label className="inputFieldLabel">Task Name</label>
                      <input
                        type="text"
                        name="Lession_name"
                        id="Lession_name"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.Lession_name}
                        // onChange={OnChange}
                        // value={
                        //   editdata && editdata.length > 0
                        //     ? editdata[0].Lession_name
                        //     : ""
                        // }
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">
                        Select Technology
                      </label>
                      <select
                        className="inputField"
                        name="Subject_ID"
                        onChange={(e) => {
                          formik.handleChange(e);
                          const selectedSubject = data.find(
                            (subject) => subject.Subject_ID === e.target.value
                          );
                          formik.setFieldValue(
                            "Subject_Name",
                            selectedSubject?.Subject_Name || ""
                          );
                        }}
                        value={formik.values.Subject_ID}>
                        <option value="">Select technology</option>
                        {subjdata &&
                          subjdata.map((subject) => (
                            <option
                              key={subject.Subject_ID}
                              value={subject.Subject_ID}>
                              {subject.Subject_Name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label className="inputFieldLabel">Video Link</label>
                      <input
                        type="text"
                        name="VIDEO_LINK"
                        id="VIDEO_LINK"
                        className="inputField"
                        onChange={formik.handleChange}
                        value={formik.values.VIDEO_LINK}
                        // onChange={OnChange}
                        // defaultValue={
                        //   editdata && editdata.length > 0
                        //     ? editdata[0].VIDEO_LINK
                        //     : ""
                        // }
                      />
                    </div>
                    <div className="col-lg-6 active-status">
                      <h3>Active Status</h3>
                      <div>
                        <label class="switch">
                          <input
                            type="checkbox"
                            name="Status"
                            id="statusCheckbox"
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldValue(
                                "Status",
                                e.target.checked ? "A" : "I"
                              );
                            }}
                            checked={formik.values.Status === "A"}
                          />
                          <span class="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-end">
                      <button className="Submitbutton" type="submit">
                        {id ? "Update" : "  Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-3"></div>
            </div>
            {id ? (
              <></>
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
        </div>
      </div>
    </>
  );
};
