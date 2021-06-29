import React from "react";

import "./scss/SideMenu.scss";

const SideMenu = () => {
  return (
    <div id="side-menu" className="position-fixed px-4">
      Create New
      <ul className="decoration-none">
        <li>Note</li>
        <li>Event</li>
        <li>Task</li>
      </ul>
    </div>
  );
};

export default SideMenu;
