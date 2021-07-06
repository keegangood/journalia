
import React, { useEffect, useRef, useState } from "react";
import HourContainer from "./HourContainer";

import {useScrollTop} from '../../../../utils/hooks/useScrollTop';
const _ = require("lodash");

//

const DayContainer = () => {
  const [hours, setHours] = useState(_.range(1,25));
  
  const dayContainerRef = useRef(null);
  const scrollPositionY = useScrollTop(dayContainerRef.current);


  return (
    <div className="row" ref={dayContainerRef}>
      
      {hours.map(hour=>(
        <HourContainer hour={hour} key={hour} topPosition={scrollPositionY}/>
      ))}
    </div>
  );
};

export default DayContainer;
