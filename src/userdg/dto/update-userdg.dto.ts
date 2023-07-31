import { PartialType } from '@nestjs/mapped-types';
import { CreateUserdgDto } from './create-userdg.dto';

export class UpdateUserdgDto extends PartialType(CreateUserdgDto) {}
