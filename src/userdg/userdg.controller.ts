import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserdgService } from './userdg.service';
import { CreateUserdgDto, LoginUserdgDto } from './dto/create-userdg.dto';
import { UpdateUserdgDto } from './dto/update-userdg.dto';
// import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';
import { HttpStatusCode } from 'axios';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdg } from './entities/userdg.entity';
import * as bcrypt from 'bcrypt';

@Controller('userdg')
export class UserdgController {
  constructor(
    private readonly userdgService: UserdgService,
    @InjectRepository(Userdg) private userdgRepository: Repository<Userdg>,
  ) {}

  // @Post('create')
  // async create(@Body() createUserdgDto: CreateUserdgDto) {
  //   return this.userdgService.createUser(createUserdgDto);
  // }

  // @Post('login')
  // @HttpCode(200)
  // async login(@Body() loginUserdgDto: LoginUserdgDto) {
  //   return this.userdgService.login(loginUserdgDto);
  // }

  @Get()
  findAll() {
    return this.userdgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userdgService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserdgDto: UpdateUserdgDto) {
    // Vérifiez que l'utilisateur tente de mettre à jour son propre ID
    return this.userdgService.update(
      +id,
      updateUserdgDto.currentPassword,
      updateUserdgDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userdgService.remove(+id);
  }
}
