import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserdgModule } from './userdg/userdg.module';
import { Userdg } from './userdg/entities/userdg.entity';
import { PlatformsModule } from './platforms/platforms.module';
import { Platform } from './platforms/entities/platform.entity';
import { Media } from './media/entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: String(process.env.DB_USERNAME),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Userdg, Platform, Media],
      synchronize: true,
    }),
    UserdgModule,
    PlatformsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
