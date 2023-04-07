import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ time }) => {
  // Convert the time string into a Date object
  const countdownDate = new Date(time);
  console.log(time);

  // Define the renderer function for the countdown
  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="">
      {/* <div>{days} days</div> */}
      <span>{hours} hour </span>
      <span>{minutes} minute </span>
      <span>{seconds} second </span>
    </div>
  );

  return <Countdown date={countdownDate} renderer={renderer} />;
};

export default CountdownTimer;
