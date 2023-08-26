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
} from '@nestjs/common';
import { UserdgService } from './userdg.service';
import { CreateUserdgDto, LoginUserdgDto } from './dto/create-userdg.dto';
import { UpdateUserdgDto } from './dto/update-userdg.dto';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserdgDto: UpdateUserdgDto) {
  //   return this.userdgService.update(+id, updateUserdgDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserdgDto: UpdateUserdgDto,
  ) {
    if (isNaN(+id)) {
      throw new BadRequestException('Invalid ID format');
    }

    // Vérifiez que l'utilisateur tente de mettre à jour son propre ID
    if (+id !== req.user.userId) {
      // Notez le changement ici
      throw new ForbiddenException(
        'Vous ne pouvez modifier que votre propre compte',
      );
    }

    const updatedUser = await this.userdgService.update(+id, updateUserdgDto);

    if (!updatedUser) {
      throw new NotFoundException(`L'utilisateur numero ${id} est introuvable`);
    }

    return {
      message: 'Mise à jour réussie',
      data: updatedUser,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userdgService.remove(+id);
  }
}
