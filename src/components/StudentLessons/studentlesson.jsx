import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const StudentLessons = () => {
  const [data, setData] = useState();
  const [subjdata, setSubjData] = useState();

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
        const response = await fetch(API_URL + "Lession/SaveLession", {
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

  //   test

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleBackward = () => {
    // You can implement your own logic for backward seeking
    // For example, rewind 5 seconds
    videoRef.current.currentTime -= 5;
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
                <Link to={"quiz"}>Quiz</Link>
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
              <div className="col-lg-6">
                <div className="video-wrapper">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    onEnded={() => setIsPlaying(false)}>
                    <source
                      src="http://www.adrianparr.com/download/keyboard-video.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <button onClick={handlePlayPause} disabled={isPlaying}>
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button onClick={handleBackward} disabled={isPlaying}>
                    Backward
                  </button>
                </div>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
