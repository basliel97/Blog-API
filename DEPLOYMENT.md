# Vercel Deployment Guide

This guide will walk you through deploying your NestJS blog API to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Database**: You'll need a production database (see options below)

## Database Options for Vercel

### Option 1: Vercel Postgres (Recommended)
- **Pros**: Built-in integration, automatic SSL, easy setup
- **Setup**: Create directly in Vercel dashboard
- **Cost**: Starts at $20/month

### Option 2: PlanetScale (MySQL)
- **Pros**: MySQL-compatible, serverless, generous free tier
- **Setup**: Create at [planetscale.com](https://planetscale.com)
- **Cost**: Free tier available

### Option 3: Supabase (PostgreSQL)
- **Pros**: PostgreSQL with additional features, good free tier
- **Setup**: Create at [supabase.com](https://supabase.com)
- **Cost**: Free tier available

### Option 4: Railway (PostgreSQL/MySQL)
- **Pros**: Simple setup, good for full-stack apps
- **Setup**: Create at [railway.app](https://railway.app)
- **Cost**: $5/month

## Step-by-Step Deployment

### 1. Prepare Your Repository

Your repository is already configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ Updated `main.ts` - Serverless-compatible
- ✅ Updated `app.module.ts` - Database configuration
- ✅ `vercel-build` script in `package.json`

### 2. Set Up Your Database

Choose one of the database options above and get your connection details.

### 3. Deploy to Vercel

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Repository**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your blog-api repository
   - Vercel will auto-detect it as a Node.js project

3. **Configure Project Settings**:
   - **Framework Preset**: Node.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run vercel-build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variables**:
   Click "Environment Variables" and add:

   ```
   NODE_ENV=production
   DB_TYPE=postgres  # or mysql
   DB_HOST=your-database-host
   DB_PORT=5432  # or 3306 for MySQL
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   DB_DATABASE=your-database-name
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a URL like: `https://your-project-name.vercel.app`

### 4. Test Your Deployment

1. **Health Check**:
   ```
   GET https://your-project-name.vercel.app/health
   ```

2. **Test API Endpoints**:
   ```
   GET https://your-project-name.vercel.app/users
   GET https://your-project-name.vercel.app/posts
   ```

### 5. Set Up Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update your DNS settings as instructed

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DB_TYPE` | Database type | `postgres` or `mysql` |
| `DB_HOST` | Database host | `db.example.com` |
| `DB_PORT` | Database port | `5432` (PostgreSQL) or `3306` (MySQL) |
| `DB_USERNAME` | Database username | `myuser` |
| `DB_PASSWORD` | Database password | `mypassword` |
| `DB_DATABASE` | Database name | `blog_api` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-key` |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://myapp.vercel.app` |

## Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation works locally: `npm run build`

2. **Database Connection Fails**:
   - Verify environment variables are set correctly
   - Check database is accessible from Vercel's servers
   - Ensure SSL is configured for production databases

3. **CORS Errors**:
   - Update `FRONTEND_URL` environment variable
   - Or modify CORS origins in `src/main.ts`

4. **Function Timeout**:
   - Vercel has a 10-second timeout for serverless functions
   - Optimize database queries
   - Consider using connection pooling

### Debugging

1. **Check Vercel Logs**:
   - Go to your project dashboard
   - Click on a deployment
   - View "Functions" tab for serverless function logs

2. **Local Testing**:
   ```bash
   # Test with production environment variables
   NODE_ENV=production npm run start:prod
   ```

## Next Steps

1. **Set up monitoring**: Consider using Vercel Analytics
2. **Configure CI/CD**: Vercel automatically deploys on git push
3. **Set up staging**: Create a staging environment
4. **Add custom domain**: Configure your own domain
5. **Set up database backups**: Configure automatic backups for your database

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **NestJS Documentation**: [docs.nestjs.com](https://docs.nestjs.com)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions) 