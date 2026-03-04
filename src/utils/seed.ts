import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';
import Blog from '../models/Blog';
import Service from '../models/Service';
import Testimonial from '../models/Testimonial';
import User from '../models/User';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');

    

    // Create Admin User
    await User.create({
      name: 'Admin User',
      email: 'mail@shaunsebastian.in',
      password: 'Shaun@1998',
      role: 'admin',
    });

    

    

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

seedData();
