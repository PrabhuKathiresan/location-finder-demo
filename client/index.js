const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res, next) => {
  if (req.path.indexOf('/api') === -1) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  next();
});

app.listen(3000, () => {
  console.log('Frontend server running in 3000');
});