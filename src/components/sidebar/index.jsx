import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

export const Sidebar = () => {
  const Role_Id = localStorage.getItem("Id");
  const [activeItems, setActiveItems] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const toggleActive = (itemId) => {
    setActiveItems((prevActiveItems) => ({
      ...prevActiveItems,
      [itemId]: !prevActiveItems[itemId],
    }));
  };
  const logout = () => {
    localStorage.removeItem("access_token");

    navigate("/");
  };
  return (
    <>
      {/* id="main-wrapper" */}
      <div>
        {/***********************************
      Nav header start
  ************************************/}
        {/* <div className="nav-header">
    <a href="index-2.html" className="brand-logo">
      <img className="logo-abbr" src={Logo} alt="" />
      <img className="logo-compact" src={Logo} alt="" />
      <img className="brand-title" src={Logo} alt="" />
    </a>
    <div className="nav-control">
      <div className="hamburger">
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>
    </div>
  </div> */}

        <div className="header">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                  <div className="dashboard_bar">
                    {Role_Id === "001" ? (
                      <span>Welcome to MSANTYTECH Admin!</span>
                    ) : (
                      <span>Welcome Back!</span>
                    )}
                  </div>
                </div>
                <ul className="navbar-nav header-right">
                  <li className="nav-item dropdown notification_dropdown">
                    <a
                      className="nav-link  ai-icon"
                      role="button"
                      data-toggle="dropdown">
                      <i class="bx bx-bell"></i>
                      <span className="badge light text-white rounded-circle">
                        12
                      </span>
                    </a>
                    <div className="dropdown-menu rounded dropdown-menu-right">
                      <div
                        id="DZ_W_Notification1"
                        className="widget-media dz-scroll p-3 height380">
                        <ul className="timeline">
                          <li>
                            <div className="timeline-panel">
                              <div className="media mr-2">
                                <img
                                  alt="image"
                                  width={50}
                                  src="images/avatar/1.jpg"
                                />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media mr-2 media-info">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media mr-2 media-success">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media mr-2">
                                <img
                                  alt="image"
                                  width={50}
                                  src="images/avatar/1.jpg"
                                />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media mr-2 media-danger">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media mr-2 media-primary">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <a className="all-notification">
                        See all notifications <i className="ti-arrow-right" />
                      </a>
                    </div>
                  </li>

                  <li
                    className="nav-item dropdown header-profile"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <a
                      className="nav-link"
                      role="button"
                      data-toggle="dropdown">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        width={20}
                        alt=""
                      />
                      <div className="header-info">
                        <span className="text-black">
                          <strong>Tech Admin</strong>
                        </span>
                        <p className="fs-12 mb-0">Admin</p>
                      </div>
                    </a>

                    <div
                      className={`dropdown-menu dropdown-menu-right${
                        isHovered ? " show" : ""
                      }`}>
                      <Link to={"/"} className="dropdown-item ai-icon">
                        <svg
                          id="icon-user1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        <span className="ml-2">Profile </span>
                      </Link>

                      <Link className="dropdown-item ai-icon" onClick={logout}>
                        <svg
                          id="icon-logout"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-danger"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1={21} y1={12} x2={9} y2={12} />
                        </svg>
                        <span className="ml-2">Logout </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {Role_Id === "001" ? (
          <>
            <div className="deznav">
              <div className="MainLogo">
                <img src={Logo} alt="" srcset="" />
              </div>
              <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                  <li className={activeItems["dashboard"] ? "mm-active" : ""}>
                    <Link to={"/home"}>
                      <i class="bx bx-server"></i>
                      <span className="nav-text">Dashboard</span>
                    </Link>
                  </li>
                  <li
                    onClick={() => toggleActive("apps")}
                    className={activeItems["apps"] ? "mm-active" : ""}>
                    <Link
                      to=""
                      className="has-arrow ai-icon"
                      aria-expanded="false">
                      <i class="bx bx-group"></i>
                      <span className="nav-text">Students</span>
                    </Link>
                    <ul
                      className={`mm-collapse ${
                        activeItems["apps"] ? "mm-show" : ""
                      }`}>
                      <li>
                        <Link to={"students"}>Students</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    onClick={() => toggleActive("charts")}
                    className={activeItems["charts"] ? "mm-active" : ""}>
                    <a
                      href="#"
                      className="has-arrow ai-icon"
                      aria-expanded="false">
                      <i class="bx bx-line-chart-down"></i>
                      <span className="nav-text">Lessons</span>
                    </a>
                    <ul
                      className={`mm-collapse ${
                        activeItems["charts"] ? "mm-show" : ""
                      }`}>
                      <li>
                        <Link to={"lessons"}>Lessons</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    onClick={() => toggleActive("boot")}
                    className={activeItems["boot"] ? "mm-active" : ""}>
                    <a className="has-arrow ai-icon" aria-expanded="false">
                      <i class="bx bxl-tailwind-css"></i>
                      <span className="nav-text">Subjects</span>
                    </a>
                    <ul
                      className={`mm-collapse ${
                        activeItems["boot"] ? "mm-show" : ""
                      }`}>
                      <li>
                        <Link to={"subjects"}>Subjects</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    onClick={() => toggleActive("plug")}
                    className={activeItems["plug"] ? "mm-active" : ""}>
                    <a className="has-arrow ai-icon" aria-expanded="false">
                      <i class="bx bx-terminal"></i>
                      <span className="nav-text">Questions</span>
                    </a>
                    <ul
                      className={`mm-collapse ${
                        activeItems["plug"] ? "mm-show" : ""
                      }`}>
                      <li>
                        <Link to={"questions"}>Questions</Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                <a
                  href="widget-basic.html"
                  className="ai-icon"
                  aria-expanded="false">
                  <i class="bx bxs-widget"></i>
                  <span className="nav-text">Answers</span>
                </a>
              </li> */}
                  <li
                    onClick={() => toggleActive("form")}
                    className={activeItems["form"] ? "mm-active" : ""}>
                    <a className="has-arrow ai-icon" aria-expanded="false">
                      <i class="bx bx-copy-alt"></i>
                      <span className="nav-text">Answers</span>
                    </a>
                    <ul
                      className={`mm-collapse ${
                        activeItems["form"] ? "mm-show" : ""
                      }`}>
                      <li>
                        <Link to={"answers"}>Answers</Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li
                onClick={() => toggleActive("table")}
                className={activeItems["table"] ? "mm-active" : ""}>
                <a className="has-arrow ai-icon" aria-expanded="false">
                  <i class="bx bx-table"></i>
                  <span className="nav-text">Table</span>
                </a>
                <ul
                  className={`mm-collapse ${
                    activeItems["table"] ? "mm-show" : ""
                  }`}>
                  <li>
                    <a href="table-bootstrap-basic.html">Bootstrap</a>
                  </li>
                  <li>
                    <a href="table-datatable-basic.html">Datatable</a>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => toggleActive("page")}
                className={activeItems["page"] ? "mm-active" : ""}>
                <a className="has-arrow ai-icon" aria-expanded="false">
                  <i class="bx bxs-file-doc"></i>
                  <span className="nav-text">Pages</span>
                </a>
                <ul
                  className={`mm-collapse ${
                    activeItems["page"] ? "mm-show" : ""
                  }`}>
                  <li>
                    <a href="page-register.html">Register</a>
                  </li>
                  <li>
                    <a href="page-login.html">Login</a>
                  </li>
                  <li>
                    <a
                      className="has-arrow"
                      href="javascript:void()"
                      aria-expanded="false">
                      Error
                    </a>
                    <ul aria-expanded="false">
                      <li>
                        <a href="page-error-400.html">Error 400</a>
                      </li>
                      <li>
                        <a href="page-error-403.html">Error 403</a>
                      </li>
                      <li>
                        <a href="page-error-404.html">Error 404</a>
                      </li>
                      <li>
                        <a href="page-error-500.html">Error 500</a>
                      </li>
                      <li>
                        <a href="page-error-503.html">Error 503</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="page-lock-screen.html">Lock Screen</a>
                  </li>
                </ul>
              </li> */}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="deznav">
              <div className="MainLogo">
                <img src={Logo} alt="" srcset="" />
              </div>
              <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                  <li className={activeItems["dashboard"] ? "mm-active" : ""}>
                    <Link to={"/home"}>
                      <i class="bx bx-server"></i>
                      <span className="nav-text">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"quiz"} className="ai-icon" aria-expanded="false">
                      <i class="bx bxs-widget"></i>
                      <span className="nav-text">Lesson 1</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Sidebar;
