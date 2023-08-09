import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { GiantBombService } from 'src/services/giant-bomb/giant-bomb.service';
import { MoviedatabaseService } from 'src/services/moviedatabase/moviedatabase.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly giantBomb: GiantBombService,
    private readonly movieBDD: MoviedatabaseService,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = this.mediaRepository.create(createMediaDto);
    return await this.mediaRepository.save(media);
  }

  async findAll(): Promise<Media[]> {
    return await this.mediaRepository.find();
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id: id } });
    if (!media) throw new NotFoundException(`Le titre ${id} est introuvable`);
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.findOne(id);
    Object.assign(media, updateMediaDto);
    return await this.mediaRepository.save(media);
  }

  async remove(id: number): Promise<{ message: string }> {
    const media = await this.findOne(id);
    await this.mediaRepository.remove(media);
    return { message: `Le titre avec l'ID ${id} à bien été supprimé !` };
  }
  async findMediaByTitle(title: string, platformId: number) {
    const media = await this.mediaRepository.findOne({ where: { title } });
    // const platformId = platformId;

    if (!media) {
      if (platformId > 0 && platformId < 4) {
        const tmbd = await this.movieBDD.searchMovie(title);
        return tmbd;
      } else {
        const giantbombData = await this.giantBomb.searchGame(title);
        // Traitez les données reçues si nécessaire
        return giantbombData;
      }
    }

    return media;
  }
}
