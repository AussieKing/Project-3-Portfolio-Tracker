require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('debug', true);

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwojlyx.mongodb.net/?retryWrites=true&w=majority`;
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Could not connect to MongoDB', error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
