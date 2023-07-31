import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true, name: 'constructor' })
  platformConstructor: string;
}
