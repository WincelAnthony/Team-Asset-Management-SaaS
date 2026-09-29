import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { parseServerEnvironment } from '@assetforge/config';
import { AppModule } from './app.module.js';

async function bootstrap() {
  parseServerEnvironment();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/v1', {
    exclude: ['health', 'health/live', 'health/ready'],
  });
  app.use(helmet());
  app.enableCors({
    origin: process.env['WEB_ORIGIN'] ?? 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = Number(process.env['PORT'] ?? 4000);
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
