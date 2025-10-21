import React from "react";
import { IpResult as IpResultType } from "../types";
import { TimezoneClockLive } from "./TimezoneClockLive";

interface IpResultProps {
  result: IpResultType;
}

export const IpResult: React.FC<IpResultProps> = React.memo(({ result }) => {
  return (
    <div className="result" role="status" aria-label="IP lookup result">
      <img
        src={`https://flagsapi.com/${result.country}/flat/32.png`}
        alt={`${result.country} flag`}
        title={`${result.country} flag`}
        className="flag"
      />
      <TimezoneClockLive timezone={result.timezone} />
    </div>
  );
});
