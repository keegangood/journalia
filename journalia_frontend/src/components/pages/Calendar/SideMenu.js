import React from "react";

import "./scss/SideMenu.scss";

const SideMenu = () => {
  return (
    <div id="side-menu" className="position-sticky sticky-top">
      <div className="p-3">
        Create New
        <ul className="decoration-none">
          <li>Note</li>
          <li>Event</li>
          <li>Task</li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
