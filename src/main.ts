import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS for Vercel deployment
  app.enableCors({
    origin: [
      'http://localhost:5173', 
      'http://localhost:8080',
      'https://your-frontend-domain.vercel.app', // Replace with your actual frontend domain
      process.env.FRONTEND_URL // Environment variable for frontend URL
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  // Get port from environment or use 3000
  const port = process.env.PORT || 3000;
  
  // For Vercel, we need to listen on the port they provide
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
