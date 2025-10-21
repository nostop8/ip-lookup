# React App

Frontend interface for IP lookup with country flags and timezone clocks.

## Setup

```bash
npm run dev     # Start development server on port 5173
npm run build   # Build for production
npm test        # Run tests
```

Requires backend API running on http://localhost:3001

## Features

- Add/remove multiple IP input fields
- Real-time validation and API calls
- Country flags and live timezone clocks
- Loading states and error handling

## Components

- `App.tsx` - Main app with input management
- `IpInputField.tsx` - Individual IP input with validation
- `IpResult.tsx` - Shows flag and timezone clock
- `TimezoneClockLive.tsx` - Updates every second

## Usage

1. Enter IP address in input field
2. On blur, validation and API call happen automatically
3. Results show country flag and live clock
4. Use "Add" button for multiple IPs
5. Remove button appears when multiple inputs exist