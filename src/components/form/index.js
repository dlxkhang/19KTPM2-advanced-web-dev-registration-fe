import { useState } from "react";
import Input from "../input";
import "./index.css";

function Form() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="form-wrapper">
      <form>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <Input
            label="Email"
            type="text"
            placeholder="Enter email"
            name="email"
            id="email"
            required={true}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            name="fullName"
            id="fullName"
            required={true}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            required={true}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Input
            label="Re-enter Password"
            type="password"
            placeholder="Re-enter password"
            name="passwordConfirm"
            id="passwordConfirm"
            required={true}
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            error={password !== passwordConfirm}
          />
          <hr />

          <button type="submit" className="register-btn">
            Register
          </button>
        </div>

        <div className="container sign-in">
          <p>
            Already have an account? <a href="#">Sign in</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Form;
