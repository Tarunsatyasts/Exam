import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import ResultImg from "../../assets/result.png";
import { useFormik } from "formik";
import "./resultstyles.css";
import * as Yup from "yup";
import { API_URL } from "../utils";

export const Results = () => {
  const [data, setData] = useState();

  const refreshList = async () => {
    try {
      const storedToken = localStorage.getItem("access_token");
      const StudentId = localStorage.getItem("User");
      const LessonId = sessionStorage.getItem("lessonId");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      };

      const response = await fetch(
        `${API_URL}Answer/GetResultByLession/${LessonId}/${StudentId}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.error("Response datattttttttt:", data);
      } else {
        console.error("Error fetching student details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching student details:", error.message);
    }
  };

  useEffect(() => {
    refreshList();
  }, []);

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
                <Link to={"students"}>Result</Link>
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
              <div className="ResultCard-Container">
                <div className="ResultMain-Card">
                  <div>
                    <h3 className="resulth3">Your Result</h3>
                    <span className="Resultdot">
                      <h1></h1>
                      <h5 className="ResultTot-Num resulth5"></h5>
                    </span>

                    <h2 className="resulth2">Great</h2>
                    <p className="ResultMain-Para">You scored these tests.</p>
                  </div>
                </div>

                <div className="Result-DES">
                  <div>
                    <div className="ResultSummary">
                      {data?.map((item, index) => (
                        <div className="ResultReaction" key={index}>
                          <img
                            className="ResultReac-img"
                            src={ResultImg}
                            alt="Result"
                          />
                          <p className="ResultReac">{item.RESULTTYPE}</p>
                          <p className="ResultReac-Score">
                            <span className="ResultOutof">{item.TOTAL}</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="ResultContinue-BTN mb-4">
                      <Link to={"/home"} className="text-white">
                        <p className="ResultContinue">Home</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
