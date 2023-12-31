import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/home";
import Home from "./components/home/home";
import Sidebar from "./components/sidebar";
import { Students } from "./components/students/student";
import { IndexStudents } from "./components/students";
import { Lessons } from "./components/Lessons/lessons";
import { IndexLessons } from "./components/Lessons";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import { IndexSubjects } from "./components/Subjects";
import { Subjects } from "./components/Subjects/subject";
import { IndexQuestions } from "./components/Questions";
import { Questions } from "./components/Questions/questions";
import { IndexAnswers } from "./components/Answers";
import { Answers } from "./components/Answers/answers";
import { IndexStudentLessons } from "./components/StudentLessons";
import { StudentLessons } from "./components/StudentLessons/studentlesson";
import { IndexProfile } from "./components/profile";
import { Profile } from "./components/profile/profile";
import { IndexStudentAccess } from "./components/studentaccess";
import { StudentAccess } from "./components/studentaccess/studentaccess";
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Redirect to login if token is not present
      navigate("/");
    }
    // You can also validate the token against your backend here

    // If token is invalid, redirect to login
    // if (invalidToken) {
    //   navigate("/");
    // }
  }, [navigate]);

  return <>{children}</>;
};
const token = localStorage.getItem("Id");
let paths;

if (token === "001") {
  paths = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "students",
          element: <IndexStudents />,
          children: [
            {
              index: true,
              element: <Students />,
            },
          ],
        },
        {
          path: "access",
          element: <IndexStudentAccess />,
          children: [
            {
              index: true,
              element: <StudentAccess />,
            },
          ],
        },
        {
          path: "lessons",
          element: <IndexLessons />,
          children: [
            {
              index: true,
              element: <Lessons />,
            },
          ],
        },
        {
          path: "subjects",
          element: <IndexSubjects />,
          children: [
            {
              index: true,
              element: <Subjects />,
            },
          ],
        },
        {
          path: "questions",
          element: <IndexQuestions />,
          children: [
            {
              index: true,
              element: <Questions />,
            },
          ],
        },
        {
          path: "answers",
          element: <IndexAnswers />,
          children: [
            {
              index: true,
              element: <Answers />,
            },
          ],
        },
      ],
    },
  ];
} else {
  paths = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "quiz",
          element: <IndexStudentLessons />,
          children: [
            {
              index: true,
              element: <StudentLessons />,
            },
          ],
        },
        {
          path: "profile",
          element: <IndexProfile />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ];
}

const router = createBrowserRouter(paths);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
