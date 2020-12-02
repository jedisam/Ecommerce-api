const mongoose = require('mongoose');
require('dotenv/config');

const db = process.env.db;
exports.connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB connected');
  } catch (err) {
    console.error(err.message);
    //exit process wiz failure
    process.exit(1);
  }
};
