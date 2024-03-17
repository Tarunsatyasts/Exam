import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import Search from "../../assets/search.jpg";
import { API_URL } from "../utils";
import { useId } from "../home/IdContext";
export const StudentLessons = () => {
  const { id } = useId();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const totalQuestions = data.length > 0 ? data[0]?.Questions.length : 0;
  const formik = useFormik({
    initialValues: Array(totalQuestions)
      .fill()
      .map(() => ({
        QUESTION_ID: "",
        QUESTION_NAME: "",
        OPTION_ID: "",
        OPTION_NAME: "",
      })),

    onSubmit: () => {
      submitForm();
    },
  });
  const submitForm = async () => {
    const storedToken = localStorage.getItem("access_token");
    try {
      const response = await fetch(API_URL + "Answer/SaveExam", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formik.values),
      });

      // const result = await response.json();
      alert("Submitted Successfully");
      sessionStorage.setItem("lessonId", Id);
      navigate("/home/result");
      // if (response.ok) {
      //   sessionStorage.setItem("lessonId", Id);
      //   navigate("/home/result");
      // } else {
      //   alert("please try again");
      //   // console.log("sjfhsgfhg", formik.values);
      //   // console.error("Create failed:", result.message);
      // }
    } catch (error) {
      alert("please try again");
      // console.error("Fetch error:", error.message);
    }
  };
  const handleNext = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex < totalQuestions - 1 ? currentQuestionIndex + 1 : 0
    );
  };
  const handleOptionSelect = (
    questionId,

    optionId,
    optionName,
    LessonName,
    answerId
  ) => {
    const currentAnswers = formik.values[currentQuestionIndex] || {};
    const StudentId = localStorage.getItem("User");
    const question = data[0].Questions[currentQuestionIndex];

    // Check if question.options is defined before calling .find()
    const option = question.options
      ? question.options.find(
          (opt) => opt.OPTION_ID === currentAnswers?.OPTION_ID
        )
      : undefined;

    formik.setFieldValue(currentQuestionIndex, {
      QUESTION_ID: question.Question_ID,
      Question_name: question.Question_name,
      OPTION_ID: optionId,
      OPTION_NAME: optionName,
      Lession_ID: Id, // Make sure 'Id' is defined in your scope
      Lession_name: LessonName,
      STUDENT_ID: StudentId,
      SUBJECT_ID: id,
      SEQNO: "",
      EDITED_BY: "",
      CREATED_BY: "",
      ANSWER_TYPE: "radio",
      ANSWER_ID: answerId,
      STATUS: "A",
    });
  };

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
        `${API_URL}Question/GetVideoandquestionsByLession/${Id}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
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
    setShowQuestions(true);
  };

  if (!data || !data[0]) {
    return <p>Loading...</p>;
  }

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
                  <video ref={videoRef} autoPlay onEnded={handleVideoEnd}>
                    <source src={data[0].VIDEO_LINK} type="video/mp4" />
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
                {showQuestions &&
                data.length > 0 &&
                data[0]?.Questions &&
                data[0]?.Questions.length > 0 ? (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="question-container">
                      <div className="question">
                        {data[0].Questions[currentQuestionIndex].Question_name}
                      </div>
                      <div className="radio-group">
                        {data[0].Questions[currentQuestionIndex].Options.map(
                          (option, index) => (
                            <div
                              key={option.OPTION_ID}
                              className="radio-wrapper">
                              <label className="radio-button">
                                <input
                                  type="radio"
                                  id={`option${option.OPTION_ID}`}
                                  name={`OPTION_ID_${currentQuestionIndex}`}
                                  value={option.OPTION_ID}
                                  checked={
                                    formik.values[currentQuestionIndex]
                                      ?.OPTION_ID === option.OPTION_ID
                                  }
                                  onChange={() =>
                                    handleOptionSelect(
                                      data[0].Questions[currentQuestionIndex]
                                        .Question_ID,
                                      option.OPTION_ID,
                                      option.OPTION_NAME,
                                      data[0].Lession_Name,
                                      option.ANSWER_ID
                                    )
                                  }
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-label">
                                  {option.OPTION_NAME}
                                </span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      <div className="d-flex justify-content-end">
                        {currentQuestionIndex < totalQuestions - 1 ? (
                          <button
                            className="next-button"
                            type="button"
                            onClick={handleNext}>
                            Next
                          </button>
                        ) : (
                          <button
                            className="submit-button-task"
                            type="button"
                            onClick={formik.submitForm}>
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="noquestion-container d-flex justify-content-center">
                    <div>
                      <img src={Search} alt="search" className="searchImg" />
                      <p className="titlenoq">No questions available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
