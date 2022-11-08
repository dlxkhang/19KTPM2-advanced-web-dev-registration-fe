import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input";
import registerValidationSchema from "./validation/register.schema";
import "./index.css";
import instance from "../../service/public-api";

function Register() {
  const navigate = useNavigate();
  
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
    return instance.post('/auth/register', registerFormData);
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          {error && error.response && error.response.status === 409 && (
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

        <div className="container login">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              <b>Login</b>
            </span>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
