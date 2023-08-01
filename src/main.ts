import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
console.log(
  'DB_PASSWORD is a string:',
  typeof process.env.DB_PASSWORD === 'string',
);
console.log('DB_PASSWORD value:', process.env.DB_PASSWORD);
dotenv.config({ path: '.env' });
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log(typeof 'DB_PASSWORD:', process.env.DB_PASSWORD);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
