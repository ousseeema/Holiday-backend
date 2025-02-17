const mongoose = require('mongoose');


const connectDB = async () => {
  const MONGO_URI = "mongodb://localhost:27017/data";

  try {
    console.log('Connecting to database...'.cyan);

    await mongoose.connect(MONGO_URI);

    console.log("Connected to database".yellow);
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    
    process.exit(1);
  }
};

module.exports = connectDB; 
