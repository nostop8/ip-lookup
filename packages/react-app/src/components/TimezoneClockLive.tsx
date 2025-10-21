import React, { useState, useEffect } from "react";

interface TimezoneClockProps {
  timezone: string;
}

export const TimezoneClockLive: React.FC<TimezoneClockProps> = React.memo(
  ({ timezone }) => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
      const updateTime = () => {
        try {
          const now = new Date();
          const timeString = now.toLocaleTimeString("en-US", {
            timeZone: timezone,
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          setTime(timeString);
        } catch {
          setTime("Invalid timezone");
        }
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }, [timezone]);

    return <div className="current-time">{time}</div>;
  }
);
