import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const logout = (e) => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("You logged out successfully!");
  };

  const getName = async () => {
    try {
      await fetch("http://localhost:1337/dashboard/", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((res) => setName(res[0]?.user_name));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <h2>Hello {name}</h2>
      <button className="btn btn-primary btn-block" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
