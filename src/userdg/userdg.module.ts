import { Module } from '@nestjs/common';
import { UserdgService } from './userdg.service';
import { UserdgController } from './userdg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdg } from './entities/userdg.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userdg]), // Ajoutez cette ligne
  ],
  controllers: [UserdgController],
  providers: [UserdgService],
})
export class UserdgModule {}
