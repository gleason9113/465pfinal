const express = require('express');
const axios = require('axios');
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy route to forward the request to the AirNow API
app.get('/api/aq/observation/latLong/current', async (req, res) => {
  try {
    const response = await axios.get(`https://www.airnowapi.org/aq/observation/latLong/current/${req.url}`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    res.status(500).json({ error: 'Error fetching AQI data' });
  }
});

module.exports = {
  startProxyServer: () => {
    app.listen(4000, () => {
      console.log('Proxy server listening on port 4000');
    });
  },
};
