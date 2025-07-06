# Docker Setup for Blog API

This document explains how to use Docker with the Blog API project.

## 🐳 Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (usually included with Docker Desktop)

## 🚀 Quick Start

### Development Environment

1. **Start the development environment:**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. **Access your application:**
- API: http://localhost:3000
- MySQL: localhost:3306
- Health Check: http://localhost:3000/health

3. **Stop the development environment:**
```bash
docker-compose -f docker-compose.dev.yml down
```

### Production Environment

1. **Start the production environment:**
```bash
docker-compose up --build
```

2. **Access your application:**
- API: http://localhost:3000
- MySQL: localhost:3306
- Redis: localhost:6379

3. **Stop the production environment:**
```bash
docker-compose down
```

## 📁 File Structure

```
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Production services
├── docker-compose.dev.yml  # Development services
├── .dockerignore           # Files to exclude from Docker build
└── src/health-check.js     # Health check script
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `3306` |
| `DB_USERNAME` | Database username | `root` |
| `DB_PASSWORD` | Database password | `root` |
| `DB_DATABASE` | Database name | `blog_api` |
| `JWT_SECRET` | JWT secret key | `dev_jwt_secret_key` |
| `JWT_EXPIRES_IN` | JWT expiration | `24h` |
| `PORT` | Application port | `3000` |

### Database Configuration

**Development:**
- Database: `blog_api_dev`
- Username: `blog_user`
- Password: `blog_password`

**Production:**
- Database: `blog_api`
- Username: `blog_user`
- Password: `blog_password`

## 🛠️ Useful Commands

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f api

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Rebuild and restart
docker-compose -f docker-compose.dev.yml up --build --force-recreate
```

### Production

```bash
# Start production environment
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop production environment
docker-compose down

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### Database Operations

```bash
# Access MySQL container
docker exec -it blog-api-mysql mysql -u blog_user -p

# Run migrations
docker exec -it blog-api npm run migration:run

# Backup database
docker exec blog-api-mysql mysqldump -u blog_user -p blog_api > backup.sql

# Restore database
docker exec -i blog-api-mysql mysql -u blog_user -p blog_api < backup.sql
```

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# View container logs
docker logs blog-api

# Execute command in container
docker exec -it blog-api sh

# Remove all containers
docker rm -f $(docker ps -aq)

# Remove all images
docker rmi -f $(docker images -aq)
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
# Check what's using the port
netstat -ano | findstr :3000

# Kill the process or change the port in docker-compose.yml
```

2. **Database connection issues:**
```bash
# Check if MySQL is running
docker ps | grep mysql

# Check MySQL logs
docker logs blog-api-mysql
```

3. **Permission issues:**
```bash
# On Linux/Mac, you might need to fix permissions
sudo chown -R $USER:$USER .
```

4. **Build cache issues:**
```bash
# Clear Docker build cache
docker builder prune

# Rebuild without cache
docker-compose build --no-cache
```

### Health Checks

The application includes health check endpoints:

- **Health Check:** `GET /health`
- **Readiness Check:** `GET /health/ready`

You can test these endpoints:
```bash
curl http://localhost:3000/health
curl http://localhost:3000/health/ready
```

## 🚀 Deployment

### Local Production Build

```bash
# Build production image
docker build -t blog-api:latest .

# Run production container
docker run -p 3000:3000 --env-file .env blog-api:latest
```

### Cloud Deployment

The Docker setup is ready for deployment to:

- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Heroku Container Registry**

### Environment Variables for Production

Create a `.env` file for production:

```env
NODE_ENV=production
DB_HOST=your-production-db-host
DB_PORT=3306
DB_USERNAME=your-production-username
DB_PASSWORD=your-production-password
DB_DATABASE=blog_api
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=24h
PORT=3000
```

## 📊 Monitoring

### Container Health

```bash
# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Monitor resource usage
docker stats
```

### Application Logs

```bash
# View application logs
docker-compose logs -f api

# View database logs
docker-compose logs -f mysql

# View all logs
docker-compose logs -f
```

## 🔒 Security Considerations

1. **Change default passwords** in production
2. **Use strong JWT secrets**
3. **Enable SSL/TLS** in production
4. **Regular security updates** for base images
5. **Network isolation** using Docker networks
6. **Resource limits** to prevent DoS attacks

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/deployment)
- [MySQL Docker Image](https://hub.docker.com/_/mysql) 