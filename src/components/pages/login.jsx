import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { useFormik } from "formik";
import { API_URL } from "../utils";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      try {
        const url = `${API_URL}Login/GetLogin`;

        const response = await fetch(url, {
          method: "POST", // Assuming you are sending data to the server
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Convert form data to JSON
        });

        const result = await response.json();
        localStorage.setItem("access_token", result.token);
        localStorage.setItem("Id", result.data.Roles);
        localStorage.setItem("User", result.data.UserID);
        navigate(`/home`);
      } catch (error) {
        alert("Error: " + error.message);
      }
    },
  });

  return (
    <>
      <div className="authincation h-100">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center height-100vh">
            <div className="col-md-4">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <Link to={"/home"}>
                          <img src={Logo} alt="" className="w-40" />
                        </Link>
                      </div>
                      {/* <h4 className="text-center mb-4 text-white">
                  Sign in your account
                </h4> */}
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <label className="mb-1 text-black">
                            <strong>User Id</strong>
                          </label>
                          <input
                            placeholder="Employee ID"
                            type="text"
                            name="UserId"
                            className="form-control loginForm"
                            defaultValue=""
                            onChange={formik.handleChange}
                            value={formik.values.username}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-1 text-black">
                            <strong>Password</strong>
                          </label>
                          <input
                            placeholder="Password"
                            type="password"
                            name="Password"
                            className="form-control loginForm"
                            defaultValue=""
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                        </div>
                        {/* <div className="form-row d-flex justify-content-between mt-4 mb-2">
                    <div className="form-group">
                      <div className="custom-control custom-checkbox ml-1 text-black">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="basic_checkbox_1"
                        />
                        <label
                          className="custom-control-label text-black"
                          htmlFor="basic_checkbox_1"
                        >
                          Remember my preference
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <a
                        className="text-black"
                        href="page-forgot-password.html"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div> */}
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-black text-white btn-block loginbtn">
                            Login
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-3">
                        <p className="text-black">
                          Don't have an account?
                          <Link className="text-black" to={"/signup"}>
                            Sign up
                          </Link>
                        </p>
                      </div>
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

export default Login;
