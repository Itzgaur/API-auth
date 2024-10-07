const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const tourRoutes = require('./Routes/tourRoutes');
const userRoutes = require('./Routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use(morgan('tiny'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler);

module.exports = app;
