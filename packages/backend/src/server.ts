import app from './index';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`IP Lookup endpoint: http://localhost:${PORT}/api/lookup/:ip`);
});