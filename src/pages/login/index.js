import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/input";
import loginValidationSchema from "../../validations/login.schema";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        if (data) {
          const user = data.data;
          localStorage.setItem("token", user.token);
          localStorage.setItem("fullName", user.fullName);
          navigate("/");
        }
      },
    });
  };

  const { mutate, error } = useMutation((loginFormData) => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_BASE_URL
        : process.env.REACT_APP_PROD_BASE_URL;
    return axios.post(`${baseUrl}/auth/login`, loginFormData);
  });

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h1>Login</h1>
          <hr />
          {error && error.response.status === 400 && (
            <div className="error-wrapper">
              <p className="error-text">{error.response.data}</p>
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
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            formHook={{
              ...register("password"),
            }}
            error={errors.password?.message}
          />
          <hr />
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>

        <div className="container register">
          <p>
            No account?{" "}
            <span onClick={() => navigate("/register")}>
              <b>Register</b>
            </span>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
