import { useEffect } from "react";
import React from "react";
import "./Mainpage.css";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAsyncGetProfile, selectProfile } from "../features/authSlice";
import Segment from "./Segment";
import Brand from "./Brand";
import Vehicle from "./Vehicle";

const Mainpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetProfile());
    };
    fetchBootLoader();
  }, [dispatch]);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="mainPage__root">
      <Grid container>
        <Grid item xs>
          {profile.username}
        </Grid>
        <Grid item xs>
          <span data-testid="span-title" className="mainPage__title">
            Vehicle register system
          </span>
        </Grid>
        <Grid item xs>
          <button data-testid="btn-logout" onClick={Logout}>
            Logout
          </button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Segment />
        </Grid>
        <Grid item xs={3}>
          <Brand />
        </Grid>
        <Grid item xs={6}>
          <Vehicle />
        </Grid>
      </Grid>
    </div>
  );
};

export default Mainpage;
