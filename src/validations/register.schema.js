import * as yup from "yup";

const registerValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Wrong email format"),
  fullName: yup.string().required("Full name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Must be at least 3 characters"),
  passwordConfirm: yup
    .string()
    .required("Re-enter password is required")
    .oneOf([yup.ref("password")], "Re-enter password not match"),
});

export default registerValidationSchema;