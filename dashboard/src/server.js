const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const { AN_API_KEY, AIQ_API_KEY } = require('./config.js');

app.use(cors());

app.get('/air-quality-data', async (req, res) => {
  try {
    const lat1 = -90, lng1 = -180, lat2 = 90, lng2 = 180;
    
    // Construct the URL with the coordinates and API key
    const apiUrl = `https://api.aqicn.org/map/bounds?token=${AIQ_API_KEY}&latlng=${lat1},${lng1},${lat2},${lng2}`;

    const response = await axios.get(apiUrl);


    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.get('/countries', async (req, res) => {
  try {
    const apiUrl = 'https://api.openaq.org/v2/latest';
    const response = await axios.get(apiUrl);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});