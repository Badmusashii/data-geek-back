import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdg } from 'src/userdg/entities/userdg.entity';
import { Platform } from 'src/platforms/entities/platform.entity';

@Injectable()
export class DatageekService {
  constructor(
    @InjectRepository(Userdg)
    private readonly userdgRepository: Repository<Userdg>,
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async assignUserToPlatform(
    userdgId: number,
    platformId: number,
  ): Promise<void> {
    const userdg = await this.userdgRepository.findOne({
      where: { id: userdgId },
      relations: ['platforms'],
    });
    const platform = await this.platformRepository.findOne({
      where: { id: platformId },
    });
    if (!userdg || !platform) {
      throw new Error('Utilisateur ou platforme introuvable');
    }
    userdg.platforms = [...(userdg.platforms || []), platform];

    await this.userdgRepository.save(userdg);
  }
}
