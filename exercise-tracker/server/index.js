const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/user-router');

require('dotenv').config({ path: './config/config.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/api/v1', exerciseRouter);
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
