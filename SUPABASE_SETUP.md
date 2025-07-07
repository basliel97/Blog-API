# Supabase Setup Guide for Your NestJS Blog API

This guide will help you set up Supabase as your database for the blog API.

## Why Supabase?

- ✅ **PostgreSQL Database** - Powerful, reliable, and scalable
- ✅ **Free Tier** - Generous free plan (500MB database, 50MB file storage)
- ✅ **Built-in Auth** - User authentication (optional, you can use your own)
- ✅ **Real-time** - Live subscriptions to database changes
- ✅ **Dashboard** - Beautiful UI for managing your data
- ✅ **API** - Auto-generated REST and GraphQL APIs

## Step-by-Step Setup

### 1. Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email

### 2. Create a New Project

1. Click "New Project"
2. Choose your organization
3. Fill in project details:
   - **Name**: `blog-api-db` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for setup to complete (2-3 minutes)

### 3. Get Database Connection Details

1. Go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Copy the **URI** connection string
4. Or use individual values from **Connection pooling**

### 4. Set Up Your Database Schema

Your NestJS app will create tables automatically, but you can also set them up manually:

1. Go to **SQL Editor**
2. Run this SQL to create your tables:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Configure Environment Variables

For **local development**, create a `.env` file:

```env
NODE_ENV=development
DB_TYPE=postgres
DB_HOST=db.your-project-ref.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-database-password
DB_DATABASE=postgres
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

For **Vercel deployment**, add these environment variables:

```env
NODE_ENV=production
DB_TYPE=postgres
DB_HOST=db.your-project-ref.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-database-password
DB_DATABASE=postgres
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 6. Test Your Connection

1. Start your local development server:
   ```bash
   npm run start:dev
   ```

2. Check if tables are created:
   - Go to Supabase Dashboard → **Table Editor**
   - You should see your tables created automatically

3. Test your API endpoints:
   ```bash
   # Health check
   curl http://localhost:3000/health
   
   # Create a user
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
   ```

## Supabase Dashboard Features

### Table Editor
- View and edit your data
- Add/remove rows
- Filter and sort data

### SQL Editor
- Run custom SQL queries
- Create views and functions
- Manage database schema

### Authentication (Optional)
- Built-in user authentication
- Social logins (Google, GitHub, etc.)
- Row Level Security (RLS)

### Real-time
- Subscribe to database changes
- Live updates for your frontend

## Environment Variables Reference

| Variable | Supabase Value | Description |
|----------|----------------|-------------|
| `DB_TYPE` | `postgres` | Database type |
| `DB_HOST` | `db.your-project-ref.supabase.co` | Your Supabase host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | `postgres` | Default Supabase username |
| `DB_PASSWORD` | `your-password` | Your database password |
| `DB_DATABASE` | `postgres` | Default database name |

## Troubleshooting

### Connection Issues

1. **SSL Error**: Your app is configured to handle SSL automatically
2. **Timeout**: Connection pooling is optimized for serverless
3. **Authentication**: Make sure password is correct

### Common Problems

1. **"Connection refused"**:
   - Check if host and port are correct
   - Verify your IP is allowed (if using IP restrictions)

2. **"Authentication failed"**:
   - Double-check username and password
   - Username should be `postgres`

3. **"Database does not exist"**:
   - Database name should be `postgres` (default)

### Performance Tips

1. **Connection Pooling**: Your app is configured for serverless environments
2. **Indexes**: Add indexes for frequently queried columns
3. **Row Level Security**: Enable RLS for better security

## Next Steps

1. **Deploy to Vercel** with Supabase connection
2. **Set up Row Level Security** (optional)
3. **Configure backups** (automatic with Supabase)
4. **Monitor usage** in Supabase dashboard

## Support

- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Supabase Community**: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- **Discord**: [discord.supabase.com](https://discord.supabase.com) 