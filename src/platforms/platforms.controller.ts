import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { AuthGuard } from '@nestjs/passport';

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
  // @Post(':id/medias')
  // addMediaToPlatform(@Param('id') platformId: number, @Body() mediaData: any) {
  //   return this.platformsService.addMediaToPlatform(platformId, mediaData);
  // }

  @Post(':platformId/medias')
  @UseGuards(AuthGuard('jwt'))
  addMediaToUserAndPlatform(
    @Request() req,
    @Param('platformId') platformId: number,
    @Body() body: any,
  ) {
    // console.log('Payload recu' + JSON.stringify(mediaData));
    // const userId = req.user.id;
    const mediaData = body.mediaData;
    const userId = req.user.id;
    // mediaData = mediaData.title;
    console.log(JSON.stringify(req.user, null, 2));
    console.log('userdg id : ' + userId);
    console.log('platform ID : ' + platformId);
    console.log('le media : ' + mediaData.title);
    return this.platformsService.addMediaToUserAndPlatform(
      userId,
      platformId,
      mediaData,
    );
  }
}
