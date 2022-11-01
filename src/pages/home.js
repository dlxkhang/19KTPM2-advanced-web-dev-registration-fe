import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [localStorage.getItem("token")]);

  return (
    <div
      id="home"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1>Welcome to home page!</h1>
      <h4>{localStorage.getItem("fullName")}</h4>
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
          localStorage.clear();
          navigate("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
