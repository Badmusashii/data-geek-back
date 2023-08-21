import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from 'logger.middleware';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const loggerMiddleware = new LoggerMiddleware();
  // app.use(loggerMiddleware.use.bind(loggerMiddleware)); // on utilise bind pour garder le contexte correct

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200', // Remplacez ceci par l'origine spécifique que vous voulez autoriser
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(8080);
}
bootstrap();
