import React from "react";

const RequireAuth = Component => props => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }
  return <Component {...props} />;
};

export default RequireAuth;
