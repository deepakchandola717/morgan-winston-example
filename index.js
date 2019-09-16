const express = require('express');
const morgan = require('morgan');
const winston = require('./config/winston');

const app = express();

app.use(express.json());


// Two log files are created in logs folder-->
// 1.app.log with all the recent logs and,
// 2.application- date.log with date wise logs of application

// streamed with ist and utc
app.use(morgan('combined', { stream: winston.stream }));

// Default Routes
app.get('/', (req, res) => {
  res.send('Welcome to Express');
  winston.info('requested empty');
});

app.get('/me/:myName', (req, res) => {
  res.send(`Hello, ${req.params.myName}`);
  winston.info('requested with my name');
});

app.post('/', (req, res) => {
  res.send(`Posted Body = ${req.body.name}`);
  winston.info('posted something');
});

app.get('/error', () => {
  throw (new Error());
});
//--

// Your Default Error Handler
app.use((err, req, res, next) => {
  winston.error('Internal Server Error');
  res.status(500).send('500. Internal Server Error');
  next();
});


const port = process.env.PORT || 8888;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port ${port}....`));
