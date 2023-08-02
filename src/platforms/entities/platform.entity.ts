import { Media } from 'src/media/entities/media.entity';
import { Userdg } from 'src/userdg/entities/userdg.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true, name: 'constructor' })
  platformConstructor: string;

  @ManyToMany(() => Media, (media) => media.platforms)
  medias: Media[];

  @ManyToMany(() => Userdg, (userdg) => userdg.platforms)
  users: Userdg[];
}
