import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserdgModule } from './userdg/userdg.module';
import { PlatformsModule } from './platforms/platforms.module';
import { MediaModule } from './media/media.module';
import * as dotenv from 'dotenv';
import { Userdg } from './userdg/entities/userdg.entity';
import { Platform } from './platforms/entities/platform.entity';
import { Media } from './media/entities/media.entity';
import { GiantBombService } from './services/giant-bomb/giant-bomb.service';
import { MoviedatabaseService } from './services/moviedatabase/moviedatabase.service';
import { AuthModule } from './services/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/auth/jwt.strategy';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // Assurez-vous de convertir le port en un nombre
      username: String(process.env.DB_USERNAME),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Userdg, Platform, Media],
      synchronize: false,
      dropSchema: false,
    }),
    UserdgModule,
    PlatformsModule,
    MediaModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [AppService, MoviedatabaseService, GiantBombService, JwtStrategy],
})
export class AppModule {
  constructor() {
    console.log('TypeORM config:', {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('ACCESS TOKEN : ', process.env.ACCESS_TOKEN_SECRET);
  }
}
