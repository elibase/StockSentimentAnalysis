require("dotenv").config();
const express = require('express');
const sentimentRoutes = require('./routes/sentimentRoutes');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use("/api/sentiment", sentimentRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port} (http://localhost:${port})`)
})

