// DurationPicker.js
import React, { useState,useEffect } from "react";
import styles from "./DurationPicker.module.css";

const DurationPicker = ({ onChange,contestDuration }) => {
  const [minutes, setMinutes] = useState("");

  const formatToHHMMSS = (mins) => {
    const totalSeconds = mins * 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .join(":");
  };

  const handleMinutesChange = (event) => {
    const { value } = event.target;
    if (value === "" || /^\d+$/.test(value)) {
      setMinutes(value);
      const formattedDuration = value ? formatToHHMMSS(value) : "";
      onChange(formattedDuration);
    }
  };

  return (
    <input
      type="text"
      className={styles.durationInput}
      value={minutes}
      onChange={handleMinutesChange}
      placeholder={contestDuration}
    />
  );
};

export default DurationPicker;
