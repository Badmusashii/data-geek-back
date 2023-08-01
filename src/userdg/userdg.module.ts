import { Module } from '@nestjs/common';
import { UserdgService } from './userdg.service';
import { UserdgController } from './userdg.controller';

@Module({
  controllers: [UserdgController],
  providers: [UserdgService]
})
export class UserdgModule {}
