/* eslint-disable no-mixed-operators */
import React, { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import img from "./img/ws-logo.png";

const Landing = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 max-w-xs mx-auto relative">
        <div className="absolute inset-0 m-auto" style={{ height: "300px" }}>
          <h1 className="text-center text-4xl text-green-800 font-bold mb-4">
            WORK SPACE
          </h1>
          {isSignup
            ? <Signup handleClick={() => setIsSignup(!isSignup)} />
            : <Login handleClick={() => setIsSignup(!isSignup)} />}
        </div>
      </div>
      <div className="w-1/2 bg-green-400 flex justify-center">
        <img src={img} alt="ws-logo" className="w-40 my-auto" />
      </div>
    </div>
  );
};

export default Landing;
