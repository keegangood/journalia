import React from "react";
import { GiAbstract047 } from "react-icons/gi";

import { ReactComponent as Logo } from "../../assets/img/Logo.svg";

import "./scss/LoadingSpinner.scss";

const Loading = () => {
  return (
    <div
      className="flex flex-col align-items-center justify-content-center text-center"
      id="loading-modal"
    >
      <div className="logo-lg">
        <Logo />
      </div>
      <div className="loading-spinner logo-sm py-1">
        <GiAbstract047 />
      </div>
    </div>
  );
};

export default Loading;
