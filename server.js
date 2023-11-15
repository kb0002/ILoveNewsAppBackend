const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const NEWS_API_KEY = '0436cc653bfa484b8adcba9735751ecf'; // Replace with your News API key

app.use(express.json());

app.use(cors({
  origin: 'https://kb0002.github.io/NewsAppFrontend/',
  credentials: true,
}));
app.get('/news', async (req, res) => {
  const { query } = req.query;

  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
