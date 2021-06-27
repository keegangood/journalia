import React, { useState } from "react";
import "./scss/Navbar.scss";

import { ReactComponent as Logo } from "../../../assets/img/Logo.svg";
import { IoChevronDownCircleOutline } from "react-icons/io5";

import CalendarViewSelect from "./CalendarViewSelect";

const Navbar = ({ isAuthenticated, ...props }) => {
  const [selectedView, setSelectedView] = useState("DAY");

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark position-fixed fixed-top"
      id="desktop-nav"
    >
      <div className="container-fluid d-flex" id="navbar-contents">
        <a href="#" className="navbar-brand m-0">
          <Logo />
        </a>

        <div className="mx-auto">
          <CalendarViewSelect
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            history={props.history}
          />
        </div>
        <div className="dropdown-arrow">
          <IoChevronDownCircleOutline />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
