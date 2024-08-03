import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstname: Yup.string().required("This field is required"),
  lastname: Yup.string().required("This field is required"),
  middlename: Yup.string().required("This field is required"),
  phonenumber: Yup.number()
    .positive()
    .integer()
    .required("This field is required"),
  emailaddress: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
export const profileSchema = Yup.object().shape({
  firstname: Yup.string().required("This field is required"),
  lastname: Yup.string().required("This field is required"),
  middlename: Yup.string().required("This field is required"),
  phonenumber: Yup.number()
    .positive()
    .integer()
    .required("This field is required"),
  emailaddress: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
export const loginSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("This field is required"),
  password: Yup.string().required("Password is required"),
});
export const confirmSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("This field is required"),
  activationCode: Yup.string().required("activation code is required"),
});
