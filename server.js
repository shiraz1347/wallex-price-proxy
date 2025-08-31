const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// لیست جفت‌ارزهای پایه تتر
const SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'TRXUSDT', 'AAVEUSDT', 'BNBUSDT', 'SOLUSDT',
  'XRPUSDT', 'DOTUSDT', 'ADAUSDT', 'LINKUSDT', 'USDCUSDT'
];

// endpoint: /api/depth?symbol=BTCUSDT
app.get('/api/depth', async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  try {
    const response = await axios.get(`https://api.wallex.ir/v1/depth`, {
      params: { symbol }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Wallex:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Wallex' });
  }
});

// تست سلام
app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'Proxy server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Proxy server running on port ${PORT}`);
});
