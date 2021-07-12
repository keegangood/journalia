import React, { useEffect, useRef, useState } from "react";
import HourContainer from "./HourContainer";
const _ = require("lodash");


//

const DayContainer = ({day}) => {
  const [hours, setHours] = useState(_.range(1, 25));

  return (
    <div className="row">
        {hours.map((hour) => (
          <HourContainer hour={hour} key={hour}/>
        ))}
    </div>
  );
};

export default DayContainer;
