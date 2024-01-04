import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { useFormik } from "formik";

const API_URL = "http://183.82.146.20:82/MSANTYTECH_API/";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      grant_type: "password",
    },
    onSubmit: async (values) => {
      try {
        const url = `${API_URL}Token`;

        const formData = new URLSearchParams();
        formData.append("username", values.username);
        formData.append("password", values.password);
        formData.append("grant_type", values.grant_type);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        const result = await response.json();
        localStorage.setItem("access_token", result.access_token);

        if (response.ok) {
          alert("Login Successful");
          const secondApiUrl = `${API_URL}api/Login/GetLogin?UserID=${values.username}&Password=${values.password}`;
          const secondApiResponse = await fetch(secondApiUrl, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          const secondApiResult = await secondApiResponse.json();
          if (secondApiResponse.ok) {
            navigate("/home");

            localStorage.setItem("Id", secondApiResult.Role_ID);
          } else {
            alert("Second API Failed: " + secondApiResult.message);
          }
        } else {
          alert("Login Failed: " + result.message);
        }
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
                        <Link to={"/"}>
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
                            type="text"
                            name="username"
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
                            type="password"
                            name="password"
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
