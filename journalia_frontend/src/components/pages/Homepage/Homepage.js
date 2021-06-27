import React from "react";
import "./scss/Homepage.scss";
import Navbar from "../../layout/Navbar/Navbar";

import { logout } from "../../../state/slices/auth/AuthSlice";

import { useDispatch, useSelector, connect } from "react-redux";

import CalendarViewSelect from '../../layout/Navbar/CalendarViewSelect';

const Homepage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="container-fluid page-container" id="homepage">
      <div className="boxes">
        <div className="box" id="box1"></div>
        <div className="box" id="box2"></div>
        <div className="box" id="box3"></div>
        <div className="box" id="box4"></div>
        <div className="box" id="box5"></div>
        <div className="box" id="box6"></div>
        <div className="box" id="box7"></div>
        <div className="box" id="box8"></div>
        <div className="box" id="box9"></div>
        <div className="box" id="box10"></div>
        <div className="box" id="box11"></div>
        <div className="box" id="box12"></div>
        <div className="box" id="box13"></div>
      </div>

      {/* <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          dispatch(logout(user.id));
        }}
      >
        Log out
      </button> */}
    </div>
  );
};

export default connect()(Homepage);
