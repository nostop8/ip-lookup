import express, { Request, Response } from 'express';
import cors from 'cors';
import geoip from 'geoip-lite';
import { isValidIp } from '@ip-lookup/shared/src/validation';

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json());

interface IpLookupResponse {
  country: string;
  timezone: string;
}

interface ErrorResponse {
  error: string;
}

app.get("/api/lookup/:ip", (req: Request, res: Response) => {
  const { ip } = req.params;

  if (!isValidIp(ip)) {
    return res.status(400).json({
      error: "Invalid IP address format",
    } as ErrorResponse);
  }

  const geo = geoip.lookup(ip);

  if (!geo || !geo.country || !geo.timezone) {
    return res.status(404).json({
      error: "Country or timezone information not found for this IP address",
    } as ErrorResponse);
  }

  res.status(200).json({
    country: geo.country,
    timezone: geo.timezone,
  } as IpLookupResponse);
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

export default app;
