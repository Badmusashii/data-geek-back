import { Injectable } from '@nestjs/common';
import { PLATFORMS } from './platforms.constants';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Platform } from './entities/platform.entity';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private platformsRepository: Repository<Platform>,
  ) {
    this.initializePlatforms();
  }

  async initializePlatforms() {
    const count = await this.platformsRepository.count();
    if (count === 0) {
      this.platformsRepository.save(PLATFORMS);
    }
  }

  findAll() {
    return this.platformsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} platform`;
  }
}
