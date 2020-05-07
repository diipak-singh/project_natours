const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config.env' });
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('DB connection successful.');
  });

//reading js file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
    );

// import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully');
    
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//deleting all entries from database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
    
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if(process.argv[2]==='--import'){
    importData();
}else if(process.argv[2]==='--delete'){
    deleteData();
}

console.log(process.argv);
