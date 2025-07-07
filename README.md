# Blog API

A NestJS-based blog API with authentication, posts, comments, and user management.

## Features

- User authentication with JWT
- CRUD operations for posts and comments
- User management
- Clean Architecture implementation
- Docker support
- Health check endpoints

## Local Development

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the database migrations
5. Start the development server: `npm run start:dev`

### Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

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