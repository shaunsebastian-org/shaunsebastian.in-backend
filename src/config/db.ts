import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI not found in environment variables.');
      console.warn('⚠️  Set MONGO_URI in Render environment settings.');
    }
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('🔗 Connection string format:', mongoURI.split('@')[1] || 'localhost');
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    const err = error as Error;
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('\n📝 Troubleshooting steps:');
    console.error('1. Verify MONGO_URI is set in Render environment variables');
    console.error('2. Check MongoDB Atlas Network Access allows 0.0.0.0/0');
    console.error('3. Verify connection string format is correct');
    console.error('4. Ensure database user has proper permissions');
    console.error('5. Check MongoDB Atlas cluster is running\n');
    process.exit(1);
  }
};

export default connectDB;
