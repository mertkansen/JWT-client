import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
  });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleUser = (res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        setAuth(true);
        toast.success("You registered, Well Done!");
      } else {
        setAuth(false);
        toast.error(res.message);
      }
    };

    try {
      await fetch("http://localhost:1337/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(inputs),
      })
        .then((res) => res.json())
        .then(handleUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="my-5">
        <span style={{ fontSize: "6rem", color: "darkslategrey" }}>R</span>
        egister
      </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="user_email">
          <h3>Email</h3>
        </label>
        <input
          required
          value={inputs.email}
          onChange={handleChange}
          type="email"
          name="user_email"
          className="form-control my-3"
        />
        <label htmlFor="user_password">
          <h3>Password</h3>
        </label>
        <input
          required
          value={inputs.password}
          type="password"
          name="user_password"
          onChange={handleChange}
          className="form-control my-3"
        />
        <label htmlFor="user_name">
          <h3>Name</h3>
        </label>
        <input
          required
          onChange={handleChange}
          value={inputs.name}
          name="user_name"
          className="form-control my-3"
        />{" "}
        <hr />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
