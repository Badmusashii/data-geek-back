import { Platform } from 'src/platforms/entities/platform.entity';
import { Userdg } from 'src/userdg/entities/userdg.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 100, nullable: true })
  publisher: string;

  @Column({ nullable: true })
  yearofrelease: number;

  @ManyToMany(() => Userdg, (userdg) => userdg.medias)
  users: Userdg[];

  @ManyToMany(() => Platform, (platform) => platform.medias)
  @JoinTable({ name: 'media_platform' })
  platforms: Platform[];
}
