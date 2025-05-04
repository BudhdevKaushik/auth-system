### 🛡️ Secure Auth System

A full-stack user authentication system built with Node.js, Express, EJS, PostgreSQL, bcrypt, JWT, and Google reCAPTCHA v2. It includes user registration, login, profile access, session handling via JWTs, and secure reCAPTCHA verification.

------------------------------------------------------------

🚀 Features

- User registration and login
- Server-side validation
- JWT-based session authentication
- Cookie-based token storage
- Protected profile route
- Google reCAPTCHA v2 integration
- Secure logout
- Rate limiting support (optional)
- 404 and generic error pages

------------------------------------------------------------

📦 Tech Stack

- Backend: Node.js, Express.js
- Frontend: EJS, Bootstrap 5
- Database: PostgreSQL
- Security: bcryptjs, jsonwebtoken, express-rate-limit, cookie-parser
- Bot Protection: Google reCAPTCHA v2

------------------------------------------------------------

🛠️ Setup Instructions

1. Clone the repo

git clone https://github.com/your-username/auth-system.git
cd auth-system

2. Install dependencies

npm install

3. Configure your .env file

Create a `.env` file in the root of your project and add the following variables:

PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
DB_URL=postgresql://your_db_user:your_db_password@localhost:5432/auth_system
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
RECAPTCHA_SITE_KEY=your_recaptcha_site_key

Note: Never commit your .env file to version control.

4. Create the database

Make sure PostgreSQL is running and create the required database:

CREATE DATABASE auth_system;

Then create the users table:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

------------------------------------------------------------

▶️ Running the App

npm run dev


App will be available at: http://localhost:3000

------------------------------------------------------------

✅ Routes Overview

/ - Home
/register - Register (GET, POST)
/login - Login (GET, POST)
/logout - Logout (POST)
/profile - User Profile (GET, Auth required)

------------------------------------------------------------

📁 Folder Structure

controllers/
middlewares/
routes/
config/
views/
  auth/
  partials/
  404.ejs
  error.ejs
  profile.ejs
public/
index.mjs
.env
package.json


