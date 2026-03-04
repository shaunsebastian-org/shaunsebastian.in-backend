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

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'mail@shaunsebastian.in',
      password: 'Shaun@1998',
      role: 'admin',
    });

    // Create Sample Projects
    await Project.create([
      {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform with real-time inventory management and payment processing.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        category: 'Web Development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        completionDate: new Date('2024-01-15'),
        featured: true,
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
        category: 'Mobile Development',
        technologies: ['React Native', 'Firebase', 'TypeScript'],
        liveUrl: 'https://example.com',
        completionDate: new Date('2024-02-20'),
        featured: true,
      },
      {
        title: 'AI Analytics Dashboard',
        description: 'Advanced analytics dashboard powered by machine learning for business intelligence.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        category: 'Data Analytics',
        technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
        liveUrl: 'https://example.com',
        completionDate: new Date('2024-03-10'),
        featured: false,
      },
    ]);

    // Create Sample Blogs
    await Blog.create([
      {
        title: 'The Future of Web Development',
        content: 'Exploring the latest trends and technologies shaping the future of web development. From AI integration to progressive web apps, discover what\'s next in the digital landscape.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        author: 'Shaun Sebastian',
        slug: 'future-of-web-development',
        published: true,
      },
      {
        title: 'Building Scalable Microservices',
        content: 'A comprehensive guide to designing and implementing microservices architecture for enterprise applications. Learn best practices and common pitfalls to avoid.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        author: 'Shaun Sebastian',
        slug: 'building-scalable-microservices',
        published: true,
      },
      {
        title: 'Modern UI/UX Design Principles',
        content: 'Discover the fundamental principles of modern UI/UX design that create engaging and intuitive user experiences. From color theory to accessibility.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        author: 'Shaun Sebastian',
        slug: 'modern-ui-ux-design-principles',
        published: true,
      },
    ]);

    // Create Sample Services
    await Service.create([
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern frameworks and best practices for optimal performance and user experience.',
        icon: 'Code',
        features: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'Progressive Web Apps'],
      },
      {
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
        icon: 'Smartphone',
        features: ['iOS & Android', 'Cross-Platform', 'Push Notifications', 'Offline Support'],
      },
      {
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment solutions using AWS, Azure, and Google Cloud Platform.',
        icon: 'Cloud',
        features: ['Cloud Migration', 'DevOps', 'Auto-Scaling', 'Cost Optimization'],
      },
      {
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive user interfaces designed with user-centered approach and modern design principles.',
        icon: 'Palette',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      },
      {
        title: 'Data Analytics',
        description: 'Transform your data into actionable insights with advanced analytics and visualization solutions.',
        icon: 'BarChart',
        features: ['Data Visualization', 'Business Intelligence', 'Predictive Analytics', 'Real-time Dashboards'],
      },
      {
        title: 'Cybersecurity',
        description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
        icon: 'ShieldCheck',
        features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Threat Monitoring'],
      },
    ]);

    // Create Sample Testimonials
    await Testimonial.create([
      {
        name: 'John Smith',
        position: 'CEO, Tech Corp',
        company: 'Tech Corp',
        content: 'Working with this team has been an absolute pleasure. They delivered our project on time and exceeded all expectations.',
        rating: 5,
        image: 'https://i.pravatar.cc/150?img=12',
      },
      {
        name: 'Sarah Johnson',
        position: 'CTO, Innovation Labs',
        company: 'Innovation Labs',
        content: 'Their technical expertise and attention to detail is unmatched. Highly recommend for any complex project.',
        rating: 5,
        image: 'https://i.pravatar.cc/150?img=45',
      },
    ]);

    console.log('✅ Data Seeded Successfully');
    console.log(`Created ${admin.name} with email: ${admin.email}`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

seedData();
