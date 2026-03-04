import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI not found in .env file. Using default local MongoDB.');
      console.warn('⚠️  Copy .env.example to .env and configure your MongoDB connection.');
    }
    
    console.log('🔄 Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('\n📝 Troubleshooting steps:');
    console.error('1. Check if .env file exists in the backend folder');
    console.error('2. Verify MONGO_URI is set correctly in .env');
    console.error('3. Ensure your IP is whitelisted in MongoDB Atlas');
    console.error('4. Check if MongoDB is running (for local connections)\n');
    process.exit(1);
  }
};

export default connectDB;
