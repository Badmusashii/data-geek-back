import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// Nous n'utilisons pas PartialType ici car:
// 1. Nous voulons avoir un contrôle total sur les champs qui peuvent être modifiés.
// 2. Nous ne permettons pas aux utilisateurs de modifier leur nom et prénom.

export class UpdateUserdgDto {
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
