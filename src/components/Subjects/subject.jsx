import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../utils";

export const Subjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
              // onClick={() => OnEdit(row.Subject_ID)}
              onClick={() =>
                navigate(`/home/technology/edit/${row.Subject_ID}`, {
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

  const [data, setData] = useState();
  const [editdata, setEditData] = useState();

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
  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const storedToken = localStorage.getItem("access_token");
          const StudentId = localStorage.getItem("User");
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          };
          const response = await fetch(
            `${API_URL}Subject/GetSubjectbySubject/${id}`,
            {
              headers: headers,
            }
          );
          if (response.ok) {
            const data = await response.json();
            setEditData(data);
            // setData(data);
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
        Subject_ID: editdata[0].Subject_ID,
        Subject_Name: editdata[0].Subject_Name,
        Status: editdata[0].Status,
      });
    }
  }, [editdata]);
  const tableData = {
    columns,
    data,
  };
  const formik = useFormik({
    initialValues: {
      Subject_ID: editdata ? editdata[0].Subject_ID : "",
      Subject_Name: "",
      Status: "",
      CreatedBy: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const storedToken = localStorage.getItem("access_token");
      try {
        const method = "POST";
        const response = await fetch(
          `${API_URL}Subject/${id ? "UpdateSubject" : "SaveSubject"}`,
          {
            method: method,
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
            navigate(`/home/technology`);
          } else {
            navigate(`/home/technology`);
          }

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
  const handleSubjectChange = (event) => {
    formik.handleChange(event);

    if (editdata && editdata.length > 0) {
      formik.setFieldValue("Subject_ID", editdata[0].Subject_ID);
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
                <Link to={"/home/technology"}>
                  {id ? "Edit Technology" : "Add Technology"}
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
                      <label className="inputFieldLabel">Technology Name</label>
                      <input
                        type="text"
                        name="Subject_Name"
                        id="Subject_Name"
                        className="inputField"
                        placeholder="technology"
                        // onChange={formik.handleChange}
                        onChange={handleSubjectChange}
                        initialValues={formik.values}
                        // value={formik.values}
                        defaultValue={
                          editdata && editdata.length > 0
                            ? editdata[0].Subject_Name
                            : ""
                        }
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
