import { Media } from 'src/media/entities/media.entity';
import { Platform } from 'src/platforms/entities/platform.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// reproduction de la table userdg dans la BDD
@Entity('userdg')
export class Userdg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true }) // unique car "username" est unique dans la base de données
  username: string;

  @Column({ length: 255 })
  surname: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  name: string;

  @ManyToMany(() => Media, (media) => media.users)
  @JoinTable({ name: 'user_media' })
  medias: Media[];

  @ManyToMany(() => Platform, (platform) => platform.users)
  @JoinTable({ name: 'user_platforms' })
  platforms: Platform[];
}
