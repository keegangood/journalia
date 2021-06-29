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
      <div className="container-fluid" id="navbar-contents">
        <div className="row w-100 mx-auto">
          <div className="col col-12 d-flex align-items-center justify-content-between">
            <a href="#" className="navbar-brand m-0">
              <Logo />
            </a>

            <div className="">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
