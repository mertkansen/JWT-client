import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard, Login, Register } from "./components";

// For notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool) => setIsAuthenticated(bool);

  const isAuth = async () => {
    try {
      await fetch("http://localhost:1337/auth/is-verify", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((res) => setIsAuthenticated(true));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            !isAuthenticated ? (
              <Register {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Redirect from="/" to="/dashboard" />
      </Switch>
    </div>
  );
};

export default App;
