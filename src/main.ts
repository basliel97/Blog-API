import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    app.enableCors({
    origin: 'http://localhost:5173', // Your React dev server URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
    credentials: true, // if you use cookies/auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
