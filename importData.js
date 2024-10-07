const User = require('./models/userModel');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');

dotEnv.config({ path: './config.env' });

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`db connected`);
});

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8'),
);

// console.log(tours);
User.create(tours);
