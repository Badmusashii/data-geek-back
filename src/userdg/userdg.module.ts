import { Module } from '@nestjs/common';
import { UserdgService } from './userdg.service';
import { UserdgController } from './userdg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdg } from './entities/userdg.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userdg]), // Ajoutez cette ligne
    JwtModule.register({
      secret: String(process.env.ACCESS_TOKEN_SECRET),
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UserdgController],
  providers: [UserdgService],
})
export class UserdgModule {}
