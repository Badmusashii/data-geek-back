import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';
import { Platform } from './entities/platform.entity';
import { MediaModule } from 'src/media/media.module';
import { Userdg } from 'src/userdg/entities/userdg.entity';
import { Media } from 'src/media/entities/media.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Platform, Media, Userdg]),
    MediaModule,
  ],
  controllers: [PlatformsController],
  providers: [PlatformsService],
})
export class PlatformsModule {}
