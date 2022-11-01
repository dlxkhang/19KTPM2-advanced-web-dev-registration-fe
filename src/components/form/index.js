import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";
import registerValidationSchema from "../../validations/register.schema";
import "./index.css";
import { useEffect } from "react";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = (value) => {
    const payload = { ...value };
    delete payload["passwordConfirm"];
    mutate(payload);
  };

  const { mutate, data, isSuccess, error } = useMutation((registerFormData) => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3300"
        : "https://registration-be.vercel.app";
    return axios.post(`${baseUrl}/auth/register`, registerFormData);
  });

  useEffect(() => {
    reset({
      email: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
    });
  }, [reset, isSuccess]);
  
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          {error && error.response.status === 409 && (
            <div className="error-wrapper">
              <p className="error-text">Email already exist</p>
            </div>
          )}
          {data && (
            <div className="success-wrapper">
              <p className="success-text">Created account successfully</p>
            </div>
          )}
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            id="email"
            formHook={{ ...register("email") }}
            error={errors.email?.message}
          />
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            id="fullName"
            formHook={{ ...register("fullName") }}
            error={errors.fullName?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            formHook={{
              ...register("password"),
            }}
            error={errors.password?.message}
          />
          <Input
            label="Re-enter Password"
            type="password"
            placeholder="Re-enter password"
            id="passwordConfirm"
            formHook={{
              ...register("passwordConfirm"),
            }}
            error={errors.passwordConfirm?.message}
          />
          <hr />
          <button type="submit" className="register-btn">
            Register
          </button>
        </div>

        <div className="container sign-in">
          <p>
            Already have an account? <a href="/#">Sign in</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Form;
