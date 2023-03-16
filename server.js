const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose
  .connect(DB)
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log('Environment:', process.env.NODE_ENV);
});
