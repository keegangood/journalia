import React, { useEffect, useState } from "react";

import HourContainer from "./HourContainer";

//

const DayContainer = () => {
  const [hours] = useState([...Array(25).keys()].slice(1).map(number=>number.toString()))
  // console.log(hours)
  return (
    <div className="row">
      {hours.map((hour) => {
        // <HourContainer hour={hour.toString()} key={hour} />;
      })}
    </div>
  );
};

export default DayContainer;
