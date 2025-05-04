# Full-Stack Authentication System with Google reCAPTCHA

A secure authentication system built with Node.js, PostgreSQL, and Google reCAPTCHA.

## Features

- User registration with validation
- Login with Google reCAPTCHA protection
- JWT authentication (15-minute sessions)
- Protected profile page
- Password hashing with bcrypt
- Rate limiting on auth routes (5 attempts per 15 minutes)

## Prerequisites

- Node.js (v16 or higher recommended)
- PostgreSQL (v12 or higher)
- Google reCAPTCHA API keys (v2 Checkbox)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/auth-system.git
   cd auth-system
   ```
