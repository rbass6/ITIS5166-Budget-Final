const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/api/hello/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Server started on port', port);
});