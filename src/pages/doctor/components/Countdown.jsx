import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ time }) => {
  // Convert the time string into a Date object
  const [hours, minutes] = time.split(":");
  const countdownDate = new Date();
  countdownDate.setHours(hours);
  countdownDate.setMinutes(minutes);
  // Define the renderer function for the countdown
  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="text-center">
      <span>0{hours}:</span>
      <span>{minutes}:</span>
      <span>{seconds}</span>
    </div>
  );

  return <Countdown date={countdownDate} renderer={renderer} />;
};

export default CountdownTimer;
