# Blog API - Clean Architecture with CQRS

A modern blog API built with NestJS, featuring Clean Architecture, CQRS (Command Query Responsibility Segregation), and Repository Pattern. The backend provides a robust foundation for a full-stack blog application with proper separation of concerns and maintainable code structure.

## 🏗️ Architecture Overview

This project follows Clean Architecture principles with the following layers:

- **Domain Layer**: Core business entities and repository interfaces
- **Application Layer**: Use cases, commands, queries, and their handlers
- **Infrastructure Layer**: Database implementations, external services
- **Presentation Layer**: Controllers, DTOs, and API endpoints

### Key Features

- ✅ **Clean Architecture** - Proper separation of concerns
- ✅ **CQRS Pattern** - Separate command and query handlers
- ✅ **Repository Pattern** - Abstracted data access layer
- ✅ **TypeORM Integration** - Database ORM with MySQL
- ✅ **JWT Authentication** - Secure user authentication
- ✅ **RESTful API** - Well-structured endpoints
- ✅ **TypeScript** - Full type safety
- ✅ **NestJS Framework** - Enterprise-grade Node.js framework
- ✅ **Docker Support** - Containerized deployment ready

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** 
- **MySQL**
- **Git**
- **Docker** (optional, for containerized deployment)

## 🚀 Installation

### Option 1: Docker (Recommended)

#### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd blog-api
```

#### 2. Start with Docker

**Development Environment:**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Production Environment:**
```bash
docker-compose up --build
```

#### 3. Access Your Application

- **API:** http://localhost:3000
- **Health Check:** http://localhost:3000/health
- **MySQL:** localhost:3306

> 📖 **For detailed Docker instructions, see [DOCKER.md](DOCKER.md)**

### Option 2: Local Installation

#### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd blog-api
```

#### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=blog_api

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE blog_api;
```

2. Run database migrations:
```bash
npm run migration:run
```

### 5. Start the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /users/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Post Endpoints

#### Get All Posts
```http
GET /posts
Authorization: Bearer <jwt_token>
```

#### Get Post by ID
```http
GET /posts/:id
Authorization: Bearer <jwt_token>
```

#### Create Post
```http
POST /posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post..."
}
```

#### Update Post
```http
PUT /posts/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Blog Post Title",
  "content": "Updated content..."
}
```

#### Delete Post
```http
DELETE /posts/:id
Authorization: Bearer <jwt_token>
```

#### Search Posts
```http
GET /posts/search?q=search_term
Authorization: Bearer <jwt_token>
```

### Comment Endpoints

#### Get Comments for Post
```http
GET /comments/post/:postId
Authorization: Bearer <jwt_token>
```

#### Create Comment
```http
POST /comments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "content": "Great post!",
  "postId": 1
}
```

## 🏛️ Project Structure

```
src/
├── domain/                    # Domain Layer
│   ├── entities/             # Core business entities
│   │   ├── post.entity.ts
│   │   ├── user.entity.ts
│   │   └── comment.entity.ts
│   └── repositories/         # Repository interfaces
│       ├── post.repository.ts
│       ├── user.repository.ts
│       └── comment.repository.ts
├── application/              # Application Layer
│   ├── commands/            # Command handlers
│   │   ├── posts/
│   │   ├── users/
│   │   └── comments/
│   └── queries/             # Query handlers
│       ├── posts/
│       ├── users/
│       └── comments/
├── infrastructure/           # Infrastructure Layer
│   ├── database/
│   │   ├── entities/        # ORM entities
│   │   └── repositories/    # Repository implementations
│   └── auth/
│       └── jwt.strategy.ts
└── presentation/            # Presentation Layer
    ├── controllers/
    ├── dto/
    └── guards/
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode
npm run start:prod         # Start in production mode

# Database
npm run migration:generate # Generate new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration

# Testing
npm run test               # Run unit tests
npm run test:e2e          # Run end-to-end tests
npm run test:cov          # Run tests with coverage

# Building
npm run build             # Build the application
npm run build:webpack     # Build with webpack

# Linting
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
```

## Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel.

#### Prerequisites

1. A Vercel account
2. A database (PostgreSQL recommended for Vercel)

#### Database Setup

For production, we recommend using Vercel Postgres or a managed database service:

- **Vercel Postgres**: Built-in integration with Vercel
- **PlanetScale**: MySQL-compatible serverless database
- **Supabase**: PostgreSQL with additional features
- **Railway**: Simple database hosting

#### Environment Variables

Set these environment variables in your Vercel project:

```
NODE_ENV=production
DB_TYPE=postgres  # or mysql
DB_HOST=your-database-host
DB_PORT=5432  # or 3306 for MySQL
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=your-database-name
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

#### Deployment Steps

1. **Connect your repository to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect it as a Node.js project

2. **Configure environment variables**:
   - In your Vercel project settings, add all the environment variables listed above

3. **Deploy**:
   - Vercel will automatically deploy on every push to your main branch
   - You can also trigger manual deployments

4. **Update CORS**:
   - Update the `FRONTEND_URL` in your environment variables
   - Or modify the CORS origins in `src/main.ts`

#### API Endpoints

Once deployed, your API will be available at:
- `https://your-project-name.vercel.app`

Example endpoints:
- Health check: `GET /health`
- Users: `GET /users`
- Posts: `GET /posts`
- Auth: `POST /auth/login`

### Other Deployment Options

- **Railway**: Similar to Vercel, good for full-stack apps
- **Render**: Good free tier, easy setup
- **Heroku**: Mature platform with extensive add-ons
- **Google Cloud Run**: Serverless containers
- **AWS ECS**: Enterprise-grade container orchestration

## API Documentation

The API includes Swagger documentation. When running locally, visit:
- `http://localhost:3000/api` (if Swagger is configured)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.