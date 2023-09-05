import { Injectable, NotFoundException } from '@nestjs/common';
import { PLATFORMS } from './platforms.constants';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Platform } from './entities/platform.entity';
import { Media } from 'src/media/entities/media.entity';
import { Userdg } from 'src/userdg/entities/userdg.entity';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private platformsRepository: Repository<Platform>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @InjectRepository(Userdg)
    private userRepository: Repository<Userdg>,
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

  // findOne(id: number) {
  //   console.log('ID recu : ', id);
  //   return this.platformsRepository.findOne(id as any);
  // }

  findOne(id: number) {
    console.log('ID received in findOne:', id);
    return this.platformsRepository.findOneOrFail({ where: { id } });
  }

  async findMediaForPlatform(platformId: number): Promise<Media[]> {
    const platform = await this.platformsRepository.findOne({
      where: { id: platformId },
      relations: ['medias'],
    });

    if (!platform) {
      throw new NotFoundException(`Platform with ID ${platformId} not found`);
    }
    return platform.medias;
  }

  // async addMediaToPlatform(platformId: number, mediaData: any): Promise<Media> {
  //   const platform = await this.platformsRepository.findOneOrFail({
  //     where: { id: platformId },
  //   });

  //   if (!platform) {
  //     throw new NotFoundException(`Platform with ID ${platformId} not found`);
  //   }

  //   // const newMedia: Media = this.mediaRepository.create(mediaData);
  //   const newMedia = new Media();
  //   Object.assign(newMedia, mediaData);

  //   if (!newMedia.platforms) newMedia.platforms = [];
  //   newMedia.platforms.push(platform); // Associating platform to media

  //   return this.mediaRepository.save(newMedia); // Saving media also saves the association in the junction table
  // }

  async addMediaToUserAndPlatform(
    userId: number,
    platformId: number,
    mediaData: any,
  ): Promise<Media> {
    console.log('mediaData recu dans le service back' + mediaData);
    // const newMedia = new Media()
    const platform = await this.platformsRepository.findOneOrFail({
      where: { id: platformId },
    });

    if (!platform) {
      throw new NotFoundException(`Platform with ID ${platformId} not found`);
    }

    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // const newMedia: Media = this.mediaRepository.create(mediaData);
    const newMedia = new Media();
    Object.assign(newMedia, mediaData);

    if (!newMedia.platforms) newMedia.platforms = [];
    newMedia.platforms.push(platform); // Associating platform to media

    if (!newMedia.users) newMedia.users = [];
    newMedia.users.push(user); // Associating user to media

    return this.mediaRepository.save(newMedia); // Saving media also saves the association in the junction table
  }

  async assignUserToPlatform(
    userdgId: number,
    platformId: number,
  ): Promise<void> {
    const userdg = await this.userRepository.findOne({
      where: { id: userdgId },
      relations: ['platforms'],
    });
    const platform = await this.platformsRepository.findOne({
      where: { id: platformId },
    });
    if (!userdg || !platform) {
      throw new NotFoundException('Utilisateur ou platforme introuvable');
    }
    userdg.platforms = [...(userdg.platforms || []), platform];

    await this.userRepository.save(userdg);
  }
}
