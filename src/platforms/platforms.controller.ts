import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  findAll() {
    return this.platformsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformsService.findOne(+id);
  }

  @Get(':id/medias')
  async getMediaForPlatform(@Param('id') id: string) {
    return await this.platformsService.findMediaForPlatform(+id);
  }
  @Post(':id/medias')
  addMediaToPlatform(@Param('id') platformId: number, @Body() mediaData: any) {
    return this.platformsService.addMediaToPlatform(platformId, mediaData);
  }
}
