const app = require('./app');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

dotEnv.config({ path: __dirname + '/config.env' });

const port = 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`connected to MongoDb`));

console.log(process.env.MONGODB_URI);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log(`app is running in ${process.env.NODE_ENV}`);
