import { useFormik } from "formik";
import { confirmSchema } from "../utils/validation";
import Input from "../components/UI/Input";
import { CircularProgress } from "@chakra-ui/react";
import { useActivationMutation } from "../redux/slices/apiSlice";
import { responseErrorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Activation = () => {
  const [activation, { isLoading }] = useActivationMutation();
  const navigate = useNavigate();
  const handleConfirm = async (values: any) => {
    try {
      const response = await activation(values).unwrap();
      if (response.statusCode === 200) {
        toast.success("activation successful");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      const confirmError = responseErrorHandler(err);
      toast.error(confirmError);
    }
  };
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      activationCode: "",
    },
    validationSchema: confirmSchema,
    onSubmit: (values) => {
      handleConfirm(values);
    },
  });
  return (
    <div className="max-w-[500px] mx-[2rem] flex flex-col items-center justify-center xl:mx-[auto] mt-[6rem]">
      <div className="flex flex-col gap-[1.5rem] 2xl:gap-[3rem] w-[100%]">
        <h1 className="xl:leading-[40px] leading-[35px] w-[100%] lg:text-center text-center xl:text-[30px] text-[25px] font-bold text-[#15265E]">
          Confirm Account
        </h1>
        <div className="flex flex-col gap-[1rem] w-[100%]">
          <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <Input
              label="Email Address"
              type={"email"}
              fieldProps={formik.getFieldProps("emailAddress")}
              touched={formik.touched.emailAddress}
              error={formik.errors.emailAddress}
            />
            <div className="flex flex-col gap-2">
              <Input
                label={"Activation code"}
                type={"text"}
                fieldProps={formik.getFieldProps("activationCode")}
                touched={formik.touched.activationCode}
                error={formik.errors.activationCode}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="btn text-[#fff] bg-[#15265E] hover:bg-[#15265E] w-[100%] border-0 rounded-md p-2"
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size={"10"} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Activation;
