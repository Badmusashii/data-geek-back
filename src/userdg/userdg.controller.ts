import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserdgService } from './userdg.service';
import { CreateUserdgDto, LoginUserdgDto } from './dto/create-userdg.dto';
import { UpdateUserdgDto } from './dto/update-userdg.dto';
import { HttpStatusCode } from 'axios';

@Controller('userdg')
export class UserdgController {
  constructor(private readonly userdgService: UserdgService) {}

  @Post('create')
  async create(@Body() createUserdgDto: CreateUserdgDto) {
    return this.userdgService.createUser(createUserdgDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserdgDto: LoginUserdgDto) {
    return this.userdgService.login(loginUserdgDto);
  }

  @Get()
  findAll() {
    return this.userdgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userdgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserdgDto: UpdateUserdgDto) {
    return this.userdgService.update(+id, updateUserdgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userdgService.remove(+id);
  }
}
