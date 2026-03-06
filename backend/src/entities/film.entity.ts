import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmDto } from '../films/dto';
import { Schedule } from './schedule.entity';

@Entity()
export class Film extends FilmDto {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column()
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.id)
  schedules: Schedule[];
}
