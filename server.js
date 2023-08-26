//! EXPRESS SERVER (backend - proxy)

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5001;  

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Enable CORS for all routes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query;  // get the target URL from query parameter
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error encountered:", error);  // <-- This line
    res.status(500).json({ error: 'Error fetching data from Coingecko' });
  }
});


app.get('/', (req, res) => {
    res.send('Express server is running!');
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});