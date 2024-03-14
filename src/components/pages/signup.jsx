import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { useFormik } from "formik";
import { API_URL } from "../utils";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      Student_ID: "",
      NAME: "",
      MOBILE: "",
      MAIL: "",
      ADDRESS: "",
      SUBJECT: "",
      SUbject_name: "",
      SECURITY_QUESTION: "",
      SECURITY_ANSWER: "",
      Status: "A",
      Login_Status: "Approved",
      Created_By: "",
      EMPID:"",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(API_URL + "Student/SaveStudent", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Created Successfully");
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
  return (
    <>
      <div className="authincation h-100">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center height-100vh">
            <div className="col-md-5">
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
                      <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="mb-1 text-black">
                                <strong>Employee ID</strong>
                              </label>
                              <input
                              placeholder="Employee Id"
                                type="text"
                                name="EMPID"
                                className="form-control loginForm"
                                defaultValue=""
                                onChange={formik.handleChange}
                                value={formik.values.EMPID}
                              />
                            </div>
                          </div>
                          </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="mb-1 text-black">
                                <strong>Name</strong>
                              </label>
                              <input
                              placeholder="Employee Name"
                                type="text"
                                name="NAME"
                                className="form-control loginForm"
                                defaultValue=""
                                onChange={formik.handleChange}
                                value={formik.values.NAME}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="mb-1 text-black">
                                <strong>Mobile</strong>
                              </label>
                              <input
                              placeholder="Mobile No"
                                type="tel"
                                name="MOBILE"
                                className="form-control loginForm"
                                defaultValue=""
                                onChange={formik.handleChange}
                                value={formik.values.MOBILE}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label className="mb-1 text-black">
                                <strong>Email</strong>
                              </label>
                              <input
                              placeholder="Employee Email"
                                type="email"
                                name="MAIL"
                                className="form-control loginForm"
                                defaultValue=""
                                onChange={formik.handleChange}
                                value={formik.values.MAIL}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="mb-1 text-black">
                            <strong>Address</strong>
                          </label>
                          <textarea
                            name="ADDRESS"
                            onChange={formik.handleChange}
                            value={formik.values.ADDRESS}
                            className="form-control loginForm"></textarea>
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-black text-white btn-block loginbtn">
                            Signup
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-3">
                        <p className="text-black">
                          Already have an account?
                          <Link className="text-black" to={"/"}>
                            Sign in
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

export default Signup;
