import React from "react";
import "./Auth.css";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAsyncLogin, fetchAsyncRegister } from "../features/authSlice";
import { useState } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const login = async () => {
    const result = await dispatch(fetchAsyncLogin({ username, password }));
    if (fetchAsyncLogin.fulfilled.match(result)) {
      setSuccessMsg("Successfully logged in!");
      navigate("/vehicle");
    } else {
      setSuccessMsg("Login error!");
    }
  };

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      const result = await dispatch(fetchAsyncRegister({ username, password }));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        login();
      } else {
        setSuccessMsg("Registration error!");
      }
    }
  };

  return (
    <div className="auth__root">
      <span className="auth__status">{successMsg}</span>
      <form onSubmit={authUser}>
        <div className="auth__input">
          <label data-testid="label-username">Username: </label>
          <input
            data-testid="input-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="auth__input">
          <label data-testid="label-password">Password: </label>
          <input
            data-testid="input-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <div>
          <FlipCameraAndroidIcon
            data-testid="toggle-icon"
            className="auth__toggle"
            onClick={() => setIsLogin(!isLogin)}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
