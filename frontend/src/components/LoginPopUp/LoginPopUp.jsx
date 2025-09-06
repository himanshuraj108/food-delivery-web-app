import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { url, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuning, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
