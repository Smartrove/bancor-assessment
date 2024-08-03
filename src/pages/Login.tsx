import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Input from "../components/UI/Input";
import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { loginErrorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/slices/apiSlice";
import { CircularProgress } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

const Login = () => {
  const [visible, setVisible] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleVisible = () => {
    setVisible(!visible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      const response = await login(values).unwrap();
      console.log(response);
      dispatch(setCredentials(response));
      navigate("/user-profile");
    } catch (err) {
      console.log(err);
      const loginError = loginErrorHandler(err);
      toast.error(loginError);
    }
  };

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div>
      <div className="max-w-[500px] mx-[2rem] flex flex-col items-center justify-center xl:mx-[auto] mt-[6rem]">
        <div className="flex flex-col gap-[1.5rem] 2xl:gap-[3rem] w-[100%]">
          <h1 className="xl:leading-[40px] leading-[35px] w-[100%] lg:text-center text-center xl:text-[30px] text-[25px] font-bold text-[#15265E]">
            Sign in to the Network
          </h1>
          <div className="flex flex-col gap-[1rem] w-[100%]">
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <Input
                label="Email Address"
                type={"email"}
                fieldProps={formik.getFieldProps("emailAddress")}
                touched={formik.touched.emailAddress}
                error={formik.errors.emailAddress}
              />
              <div className="flex flex-col gap-2">
                <Input
                  label={"Password"}
                  type={!visible ? "password" : "text"}
                  icon={!visible ? <FaRegEyeSlash /> : <FaRegEye />}
                  onClick={handleVisible}
                  fieldProps={formik.getFieldProps("password")}
                  touched={formik.touched.password}
                  error={formik.errors.password}
                />
                <Link
                  className="flex justify-end text-sm text-[#15265E]"
                  to="forgot-password-talent"
                >
                  Forgot Password
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="btn text-[#fff] bg-[#15265E] hover:bg-[#15265E] w-[100%] border-0 rounded-md p-2"
                >
                  {isLoading ? (
                    <CircularProgress isIndeterminate size={"10"} />
                  ) : (
                    "Sign In"
                  )}
                </button>
                <p className="text-center text-sm mt-1">
                  Don't have an account?{" "}
                  <Link className="text-[#15265E] font-bold text-md" to="/">
                    Register
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
