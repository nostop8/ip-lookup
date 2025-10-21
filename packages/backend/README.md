# Backend API

Express server for IP geolocation lookups.

## Setup

```bash
npm run dev    # Start development server on port 3001
npm run build  # Build for production
npm start      # Run production server
npm test       # Run tests
```

## Endpoints

**GET /api/lookup/:ip**
```json
// Success
{
  "country": "US",
  "timezone": "America/Chicago"
}

// Error
{
  "error": "Invalid IP address format"
}
```

**GET /health**
```json
{
  "status": "OK",
  "timestamp": "2025-10-21T12:00:00.000Z"
}
```

## Examples

```bash
curl http://localhost:3001/api/lookup/8.8.8.8
curl http://localhost:3001/api/lookup/1.1.1.1
```