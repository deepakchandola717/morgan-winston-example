const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Express');
});

app.get('/me/:myName', (req, res) => {
  res.send(`Hello, ${req.params.myName}`);
});

app.post('/', (req, res) => {
  res.send(`Posted Body = ${req.body.name}`);
});


const port = process.env.PORT || 8888;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port ${port}....`));
