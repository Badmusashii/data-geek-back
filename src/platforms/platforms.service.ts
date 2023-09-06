import { Injectable, NotFoundException } from '@nestjs/common';
import { PLATFORMS } from './platforms.constants';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Platform } from './entities/platform.entity';
import { Media } from 'src/media/entities/media.entity';
import { Userdg } from 'src/userdg/entities/userdg.entity';
import { platform } from 'os';

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

  // Dans platforms.service.ts
  async savePlatformStates(states: any): Promise<any> {
    // Ici, vous pouvez sauvegarder les états des toggles en base de données
    // ou effectuer toute autre opération nécessaire.
    return this.platformsRepository.save(states); // Exemple
  }

  async assignUserToPlatform(
    userdgId: number,
    // platformId: number,
    toggleState: { platformStates: { [id: number]: boolean } },
  ): Promise<void> {
    console.log('toggle recu dans le service ' + JSON.stringify(toggleState));
    const userdg = await this.userRepository.findOne({
      where: { id: userdgId },
      relations: ['platforms'],
    });
    // const platform = await this.platformsRepository.findOne({
    //   where: { id: platformId },
    // });
    // const platformStates = toggleState.platformStates || {};
    const platformStates = toggleState.platformStates || {};

    const platformIds = Object.keys(platformStates).map((key) => {
      return +key;
    });
    // console.log('les platforms ids cote back sont => ' + platformIds);
    const platforms = await this.platformsRepository.find({
      where: {
        id: In(platformIds),
      },
    });
    if (platforms.length !== platformIds.length) {
      throw new NotFoundException('Utilisateur ou platforme introuvable');
    }
    userdg.platforms = platforms.filter(
      (platform) => platformStates[platform.id],
    );
    // if (toggleState) {
    //   userdg.platforms = [...(userdg.platforms || []), platform];
    // } else {
    //   userdg.platforms = userdg.platforms.filter((p) => p.id !== platform.id);
    // }

    await this.userRepository.save(userdg);
  }
}
