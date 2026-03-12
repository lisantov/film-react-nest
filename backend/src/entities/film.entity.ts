import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmDto } from '../films/dto';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film extends FilmDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  rating: number;

  @Column()
  director: string;

  @Column('simple-array')
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

  @OneToMany(
      () => Schedule,
      (schedule) => schedule.film,
      {
          cascade: true,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      }
  )
  schedules: Schedule[];
}
