import React, { useState, useEffect } from "react";
import Student from "../../assets/images/student.png";
export const Home = () => {
  const Role_Id = localStorage.getItem("Id");
  const [data, setData] = useState();
  const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/api/";
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
        `${API_URL}Student/GetSubjectbyStudent?StudentID=${StudentId}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log("-=-=-=-=-=-=-==-=-=-==-=", data);
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
  const handleSelectSubject = (selectedSubjectID) => {
    localStorage.setItem("SubjectID", selectedSubjectID);
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="modal fade" id="addOrderModalside">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Students</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label className="text-black font-w500">Food Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-black font-w500">Order Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-black font-w500">Food Price</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-xxl-4 col-sm-6">
              <div className="card studentCard">
                <div className="d-flex align-items-end row">
                  <div className="col-7">
                    <div className="card-body text-nowrap">
                      <h5 className="card-title mb-0">
                        {Role_Id === "001" ? (
                          <span>msantytech Admin 🎉</span>
                        ) : (
                          <span>Welcome Back 🎉</span>
                        )}{" "}
                        {/* 🎉 */}
                      </h5>
                      <p className="mb-2">Best seller of the month</p>

                      <a
                        href="javascript:;"
                        className="btn btn-primary waves-effect waves-light">
                        View Profile
                      </a>
                    </div>
                  </div>
                  <div className="col-5 text-center text-sm-left">
                    <div className="card-body pb-0 px-0 px-md-4">
                      <img src={Student} height="140" alt="view sales" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-6">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-white font-w600">561</h2>
                      <span className="text-white">Total Students</span>
                    </div>
                    <div className="d-inline-block position-relative donut-chart-sale"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-sm-6">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-white font-w600">247</h2>
                      <span className="text-white">Total Lessons</span>
                    </div>
                    <div className="d-inline-block position-relative donut-chart-sale"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-4 col-sm-6">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-white font-w600">872</h2>
                      <span className="text-white">Total Questions</span>
                    </div>
                    <div className="d-inline-block position-relative donut-chart-sale"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-4 col-sm-6">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-white font-w600">872</h2>
                      <span className="text-white">Total Subjects</span>
                    </div>
                    <div className="d-inline-block position-relative donut-chart-sale"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-4 col-sm-6">
              <div className="card grd-card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="media-body mr-2">
                      <h2 className="text-white font-w600">872</h2>
                      <span className="text-white">Total Tasks</span>
                    </div>
                    <div className="d-inline-block position-relative donut-chart-sale"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-xl-9 col-xxl-8">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header d-sm-flex d-block pb-0 border-0">
                      <div className="mr-auto pr-3">
                        <h4 className="text-black fs-20">Customer Map</h4>
                        <p className="fs-13 mb-0 text-black">
                          Lorem ipsum dolor sit amet, consectetur
                        </p>
                      </div>
                      <div className="card-action card-tabs mt-3 mt-sm-0 mt-3 mb-sm-0 mb-3 mt-sm-0">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                              aria-selected="true">
                              Monthly
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                              aria-selected="false">
                              Weekly
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                              aria-selected="false">
                              Today
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body pb-0">
                      <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab1">
                          <div id="chartTimeline" />
                        </div>
                        <div className="tab-pane fade" id="tab2">
                          <div id="chartTimeline2" />
                        </div>
                        <div className="tab-pane fade" id="tab3">
                          <div id="chartTimeline3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-xxl-12 col-lg-8">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="text-black fs-20 mb-0">
                        Transactions Summary
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6 mb-sm-0 mb-3">
                          <div className="media align-items-center">
                            <div className="d-inline-block mr-3 position-relative donut-chart-sale2">
                              <span
                                className="donut2"
                                data-peity='{ "fill": ["rgb(84, 205, 81)", "rgba(255, 255, 255, 1)"],   "innerRadius": 27, "radius": 10}'>
                                6/8
                              </span>
                              <small className="text-black">86%</small>
                            </div>
                            <div>
                              <h4 className="fs-28 font-w600 text-black mb-0">
                                585
                              </h4>
                              <span>Succesfull Order</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="media align-items-center">
                            <div className="d-inline-block mr-3 position-relative donut-chart-sale2">
                              <span
                                className="donut2"
                                data-peity='{ "fill": ["rgb(255, 55, 112)", "rgba(255, 255, 255, 1)"],   "innerRadius": 27, "radius": 10}'>
                                3/8
                              </span>
                              <small className="text-black">14%</small>
                            </div>
                            <div>
                              <h4 className="fs-28 font-w600 text-black mb-0">
                                165
                              </h4>
                              <span>Unsuccesfull Order</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-xxl-12 col-lg-4">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="text-black fs-20 mb-0">Average</h4>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-end">
                        <div>
                          <h4 className="fs-28 font-w600 text-black mb-0">
                            87,456
                          </h4>
                          <span>Order</span>
                        </div>
                        <canvas
                          className="lineChart"
                          id="chart_widget_2"
                          height={85}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card trending-menus">
                    <div className="card-header d-sm-flex d-block pb-0 border-0">
                      <div>
                        <h4 className="text-black fs-20">
                          Daily Trending Menus
                        </h4>
                        <p className="fs-13 mb-0 text-black">
                          Lorem ipsum dolor
                        </p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#1</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Medium Spicy Spagethi Italiano
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/9.png"
                          alt=""
                          width={60}
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#2</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Watermelon juice with ice
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/10.png"
                          alt=""
                          width={60}
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#3</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Chicken curry special with cucumber
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/11.png"
                          alt=""
                          width={60}
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                        <span className="num">#4</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Italiano Pizza With Garlic
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/12.png"
                          alt=""
                          width={60}
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex tr-row align-items-center">
                        <span className="num">#5</span>
                        <div className="mr-auto pr-3">
                          <a href="post-details.html">
                            <h2 className="text-black fs-14">
                              Tuna Soup spinach with himalaya salt
                            </h2>
                          </a>
                          <span className="text-black font-w600 d-inline-block mr-3">
                            $5.6{" "}
                          </span>{" "}
                          <span className="fs-14">Order 89x</span>
                        </div>
                        <img
                          src="images/menus/9.png"
                          alt=""
                          width={60}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="row">
            {data &&
              data.map((subject, index) => (
                <>
                  <div className="col-lg-3">
                    <div class="modalsub" key={index}>
                      <h1 class="modal__heading">
                        Subject : {subject.SUbject_name}
                      </h1>
                      <p class="modal__text">
                        Select the subject to view lessons and begin the task.
                      </p>
                      <div class="modal__buttons">
                        <button
                          className="modal__button modal__button--primary"
                          onClick={() => handleSelectSubject(subject.SUBJECT)}>
                          Select Subject
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
