const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Camera = require('../models/cameraModel');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.log(err);
  });
const cameras = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

const importData = async () => {
  try {
    await Camera.create(cameras);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Camera.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
}

if (process.argv[2] == '--delete') {
  deleteData();
}
