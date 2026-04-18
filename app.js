require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/mongo');
const { createUserTable } = require('./models/user.model');
const errorHandler = require('./middleware/error.middleware');


const app = express();
app.use(express.json());

(async () => {
  await connectMongo();
  await createUserTable();
})();

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use(errorHandler);

module.exports = app;
