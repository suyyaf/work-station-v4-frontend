import React, { useState } from "react";
import axios from "axios";

const Login = ({ handleClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    axios
      // .post("http://localhost:5000/login", {
      .post("https://ws-api-backend.herokuapp.com/login", {
        username: username,
        email: email,
        password: password
      })
      .then(res => {
        //successful, save token
        if (res.status === 200) {
          const token = res.data.token;

          localStorage.setItem("token", token);

          window.location.href =
            "https://ws-client-frontend.herokuapp.com/dashboard";
        } else {
          //validation
          console.log(`err`);
        }
      })
      .catch(err => console.log("err", err));
  };

  return (
    <div style={{ height: "300px" }}>
      <h1 className="text-center text-green-400 font-bold">login</h1>
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
      <div className="flex justify-between items-center">
        <div>
          <p>
            No account?{" "}
            <span
              className="text-green-400 cursor-pointer"
              onClick={handleClick}
            >
              Signup
            </span>
          </p>
        </div>
        <button
          className="rounded-lg px-6 py-3 font-bold bg-green-400 text-white"
          onClick={() => onSubmit()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
