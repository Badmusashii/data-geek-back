import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
