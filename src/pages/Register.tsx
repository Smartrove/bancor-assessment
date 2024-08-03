import { useFormik } from "formik";
import Input from "../components/UI/Input";
import { registerSchema } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/slices/apiSlice";
import { signupErrorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { CircularProgress } from "@chakra-ui/react";

const Register = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    try {
      const response = await register(values).unwrap();
      if (response.statusCode === 200) {
        toast.success("user is registered successfully");
        navigate("/confirm-activation-code");
      }
    } catch (err) {
      console.log(err);
      const registerError = signupErrorHandler(err);
      toast.error(registerError);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      middlename: "",
      emailaddress: "",
      phonenumber: "",
      role: 52,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <div className="max-w-[500px] mt-[4rem] mx-[2rem] lg:mx-[auto]">
      <div className="flex flex-col gap-[1.5rem] 2xl:gap-[3rem] w-[100%]">
        <h1 className="text-[#15265E] xl:leading-[40px] leading-[35px] w-[100%] lg:text-center text-center xl:text-[30px] text-[25px] font-bold">
          Join the Network
        </h1>
        <div className="flex flex-col gap-[1rem] w-[100%]">
          <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <Input
              label={"First Name"}
              type={"text"}
              fieldProps={formik.getFieldProps("firstname")}
              touched={formik.touched.firstname}
              error={formik.errors.firstname}
            />
            <Input
              label={"Middle Name"}
              type={"text"}
              fieldProps={formik.getFieldProps("middlename")}
              touched={formik.touched.middlename}
              error={formik.errors.middlename}
            />
            <Input
              label={"Last Name"}
              type={"text"}
              fieldProps={formik.getFieldProps("lastname")}
              touched={formik.touched.lastname}
              error={formik.errors.lastname}
            />
            <Input
              label={"Email Address"}
              type={"email"}
              fieldProps={formik.getFieldProps("emailaddress")}
              touched={formik.touched.emailaddress}
              error={formik.errors.emailaddress}
            />
            <Input
              label={"Phone Number"}
              type={"text"}
              fieldProps={formik.getFieldProps("phonenumber")}
              touched={formik.touched.phonenumber}
              error={formik.errors.phonenumber}
            />
            <Input
              label={"Password"}
              type={!visible ? "password" : "text"}
              icon={!visible ? <FaRegEyeSlash /> : <FaRegEye />}
              onClick={handleVisible}
              fieldProps={formik.getFieldProps("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <div className="flex flex-col gap-2">
              <button
                // disabled={isLoading}
                type="submit"
                className="btn text-[#fff] bg-[#15265E] hover:bg-[#15265E] w-[100%] border-0 rounded-md p-2"
              >
                {isLoading ? (
                  <CircularProgress size={"15px"} isIndeterminate />
                ) : (
                  "Register"
                )}
              </button>
              <p className="text-center text-sm">
                Already a member?{" "}
                <Link className="text-[#15265E]" to="/login">
                  Log In
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
