import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import Search from "../../assets/search.jpg";
const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";

export const StudentLessons = () => {
  const [data, setData] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const { Id } = useParams();
  const videoRef = useRef(null);

  const refreshList = async () => {
    try {
      const storedToken = localStorage.getItem("access_token");
      const StudentId = localStorage.getItem("User");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      };

      const response = await fetch(

          `${API_URL}Question/GetVideoandquestionsByLession?Lession_ID=${Id}`,
          {
            headers: headers,
          }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log("-=-=-=-=-=-=-==QUIZZZZZZZZZZZZZ-=-=-==-=", data);
      } else {
        console.error("Error fetching student details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching student details:", error.message);
    }
  };


  useEffect(() => {
    refreshList();
  }, [Id]);
  useEffect(() => {
    // Reset video playback when Id changes
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setShowQuestions(false);
    }

  }, [Id]);

  //   test
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowQuestions(true); // Set showQuestions to true when the video ends
  };

  if (!data || !data[0]) {
    return <p>Loading...</p>; // You can replace this with a loading indicator
  }


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


                      onEnded={handleVideoEnd}>
                    <source
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                        type="video/mp4"
                    />
                  </video>
                  {/*<button onClick={handlePlayPause} disabled={isPlaying}>*/}
                  {/*  {isPlaying ? "Pause" : "Play"}*/}
                  {/*</button>*/}
                  {/*<button onClick={handleBackward} disabled={isPlaying}>*/}
                  {/*  Backward*/}
                  {/*</button>*/}
                </div>
              </div>
              <div className="col-lg-6">
                {showQuestions && data[0]?.Questions && data[0]?.Questions.length > 0 ? (
                    data[0].Questions.map(question => (
                        <div key={question.Question_ID} className="question-container">
                          <div className="question">{question.Question_name}</div>
                          <div className="radio-group">
                            <div class="radio-container">

                            </div>
                            {question.options.map(option => (

                                <div key={option.OPTION_ID} class="radio-wrapper">
                                  <label class="radio-button">
                                    <input id="option1"  type={option.ANSWER_TYPE} name={question.Question_ID}
                                           value={option.OPTION_ID}/>
                                      <span class="radio-checkmark"></span>
                                      <span class="radio-label"> {option.OPTION_NAME}</span>
                                  </label>
                                </div>

                            ))}
                          </div>
                          <div className="d-flex justify-content-end">
                            <button className="submit-button-task" type="submit">
                              Submit
                            </button>
                          </div>
                        </div>
                    ))
                ) : (
                    <>
                      <div className="noquestion-container d-flex justify-content-center">
                        <div>
                      <img src={Search} alt="search" className="searchImg"/>
                      <p className="titlenoq">No questions available</p>
                        </div>
                      </div>
                    </>

                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};
