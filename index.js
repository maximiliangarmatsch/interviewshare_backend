const express = require('express');
const router = require('./routes');
const ErrorHandler = require('./error/handler');

const app = express();
app.use(express.json());
app.use('/', router);

app.get('/user', (req, res, next) => {
  res.send('This is get user!');
});

app.put('/user', (request, response, next) => {
  response.statusCode = 403;
  response.send('PUT operation not supported on user');
});

app.delete('/user', (request, response, next) => {
  response.send('Deleted user');
});

app.use(ErrorHandler);
app.listen(3000, () => console.log('server running on port 3000'));
