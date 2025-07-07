import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8080','https://blog-app-beige-five.vercel.app'], // Allow both dev and Docker frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true, // if you use cookies/auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
