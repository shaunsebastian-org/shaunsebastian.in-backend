# Portfolio Backend

Backend API for the portfolio website built with Node.js, Express, TypeScript, and MongoDB.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

Then edit `.env` and update the values:
- `MONGO_URI`: Your MongoDB connection string (Atlas or local)
- `JWT_SECRET`: A secure random string for JWT tokens
- `PORT`: Server port (default: 5000)

### 3. Seed the Database (First Time Only)
Create the initial admin user:
```bash
npm run seed
```

Default admin credentials:
- Email: `mail@shaunsebastian.in`
- Password: `Shaun@1998`

### 4. Start the Development Server
```bash
npm run dev
```

The server will start at `http://localhost:5000`

## MongoDB Connection

### Using MongoDB Atlas (Cloud)
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string from the cluster
3. Replace `<password>` with your actual password
4. URL-encode special characters in the password:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - etc.

### Using Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/portfolio`

## Troubleshooting

### "Operation buffering timed out"
- Check if MongoDB is running and accessible
- Verify your connection string is correct
- Ensure your IP is whitelisted in MongoDB Atlas (if using cloud)

### "Failed to create account"
- Check backend console for detailed error logs
- Ensure MongoDB connection is established
- Verify all required fields are provided

### "Invalid email or password"
- Run the seed script to create the admin user
- Check if the user exists in the database
- Verify the password is correct
