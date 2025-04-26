import React, { useEffect, useState } from "react";

const DigitalClock = () => {
  const [date, setDate] = useState<Date>(new Date());

useEffect(() => {
  const clock = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(clock)
  }, []);

  return (
    <div>
      <p>{date.toLocaleString()}</p>
    </div>
  );
};

export default DigitalClock;
