# IP Lookup

A full-stack application for looking up country and timezone information based on IP addresses.

## Components

- **Backend**: Express API server for IP geolocation
- **Frontend**: React app with TypeScript
- **Shared**: Common validation utilities

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start both applications:
   ```bash
   npm run dev
   ```

   This starts:
   - Backend API on http://localhost:3001
   - React app on http://localhost:5173
   - Vue app on http://localhost:5174

## Features

- Multiple IP input fields
- Real-time validation
- Country flags and timezone clocks
- Error handling

## API

Base URL: http://localhost:3001

- `GET /api/lookup/:ip` - Get country and timezone for IP
- `GET /health` - Health check

Sample IPs: `8.8.8.8`, `1.1.1.1`

## Development

```bash
npm run build      # Build for production
npm run type-check # TypeScript check
npm run lint       # Lint code
npm test           # Run tests
```