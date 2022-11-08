import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import instance from "../../service/private-api";
import Input from "../../components/input";
import { useForm } from "react-hook-form";

export default function Profile() {
  const navigate = useNavigate();
  useQuery(["profile"], async () => {
    const res = await instance.get("/user/profile");
    setValue('email', res.data.email);
    setValue('fullName', res.data.fullName);
    return res.data;
  });
  useEffect(() => {
    if (!localStorage.getItem("session")) navigate("/login");
  }, [localStorage.getItem("session")]);

  const { register, setValue } = useForm();

  return (
    <div className="profile-wrapper">
      <div className="container">
        <h1>User Profile</h1>
        <hr />
        <Input
          label="Email"
          type="email"
          id="email"
          formHook={{ ...register("email") }}
          isDisable={true}
        />
        <Input
          label="Full Name"
          type="text"
          id="fullName"
          formHook={{ ...register("fullName") }}
          isDisable={true}
        />
        <hr />

        <button
          style={{
            backgroundColor: "#1046c7",
            color: "white",
            padding: "16px 20px",
            margin: "8px 0",
            border: "none",
            cursor: "pointer",
            opacity: 0.9,
          }}
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("session");
            navigate("/login");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
