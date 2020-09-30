import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [input, setInputs] = useState({
    user_email: "",
    user_password: "",
  });

  const handleInput = (e) =>
    setInputs({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inner function, because: only handleSubmit uses this
    const handleToken = (res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        setAuth(true);
        toast.success("You logged in succesfully!");
      } else {
        setAuth(false);
        localStorage.removeItem("token");
        toast.error(res.message);
      }
    };

    try {
      await fetch("http://localhost:1337/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(input),
      })
        .then((res) => res.json())
        .then(handleToken);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="my-5">
        <span style={{ fontSize: "6rem", color: "darkslategrey" }}>L</span>
        ogin
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_email">Email</label>
        <input
          value={input.user_email}
          onChange={handleInput}
          type="email"
          name="user_email"
          className="form-control my-3"
        />

        <label htmlFor="user_password">Password</label>
        <input
          type="password"
          name="user_password"
          value={input.user_password}
          onChange={handleInput}
          className="form-control my-3"
        />
        <hr />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
