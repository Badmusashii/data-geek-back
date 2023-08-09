import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserdgDto, LoginUserdgDto } from './dto/create-userdg.dto';
import { UpdateUserdgDto } from './dto/update-userdg.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdg } from './entities/userdg.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserdgService {
  constructor(
    @InjectRepository(Userdg)
    private readonly userRepository: Repository<Userdg>,
  ) {}

  // create(createUserdgDto: CreateUserdgDto) {
  //   return 'This action adds a new userdg';
  // }

  async createUser(createUserDto: CreateUserdgDto): Promise<Userdg> {
    const user = new Userdg();
    user.username = createUserDto.username;
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10); // Le "10" est le nombre de tours de salage

    return await this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserdgDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      // Le mot de passe correspond
      return { message: 'Succès !' }; // Vous devriez probablement retourner un JWT ou un autre jeton ici
    } else {
      throw new UnauthorizedException('Identifiants incorrects.');
    }
  }

  findAll() {
    return `This action returns all userdg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userdg`;
  }

  update(id: number, updateUserdgDto: UpdateUserdgDto) {
    return `This action updates a #${id} userdg`;
  }

  remove(id: number) {
    return `This action removes a #${id} userdg`;
  }
}
