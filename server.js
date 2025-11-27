const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock data for now (later you can plug in real systems) ---
const services = [
  { id: 1, name: 'User Portal', status: 'healthy', responseTimeMs: 120 },
  { id: 2, name: 'Payments API', status: 'degraded', responseTimeMs: 450 },
  { id: 3, name: 'Reporting Service', status: 'down', responseTimeMs: null },
];

// Simple API route
app.get('/api/status', (req, res) => {
  res.json({ message: 'InsightFlow backend is running' });
});

// New: list services and their status
app.get('/api/services', (req, res) => {
  res.json({ services });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
