const express = require('express');
const path = require('path');
const authRouters = require('./routers/authRouters');

// const photoRouters = require('./routes/photoRouters');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api/auth', authRouters);
// app.use('/api', photoRouters);

// Global route handler
app.use('*', (req, res) => {
  console.log('Page not found.');
  return res.status(404).send('Page not found.');
});

app.use('/', (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
