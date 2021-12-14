import React, { useState, useEffect } from "react";
import axios from "axios";

const Signup = ({ handleClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = () => {
    axios
      // .post("http://localhost:5000/signup", {
      .post("https://ws-api-backend.herokuapp.com/signup", {
        username: username,
        email: email,
        password: password
      })
      .then(res => {
        //successful, save token
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);

          window.location.reload = "https://ws-client-frontend.herokuapp.com/";
        } else {
          //validation
          console.log(`else`);
        }
      })
      .catch(err => console.log("err", err));
  };

  useEffect(
    () => {
      password === confirmPassword ? setDisabled(false) : setDisabled(true);
    },
    [password, confirmPassword]
  );

  const disableButton = disabled
    ? "rounded-lg px-6 py-3 font-bold  text-white bg-gray-400"
    : "rounded-lg px-6 py-3 font-bold  text-white bg-green-400";

  return (
    <div style={{ height: "300px" }}>
      <h1 className="text-center text-green-400 font-bold">signup</h1>
      <div className="mb-4">
        <label>username</label>
        <input
          onChange={e => setUsername(e.target.value)}
          value={username}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="text"
          placeholder="username"
        />
      </div>
      <div className="mb-4">
        <label>email</label>
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="email"
          placeholder="email"
        />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="mb-4">
        <label>confirm password</label>
        <input
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="password"
          placeholder="confirm password"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>
            Already a member?
            <span
              className="text-green-400 cursor-pointer"
              onClick={handleClick}
            >
              Log In
            </span>
          </p>
        </div>
        <button
          className={disableButton}
          disabled={disabled}
          onClick={() => onSubmit()}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
