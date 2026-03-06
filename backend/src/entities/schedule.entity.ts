import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleDto } from '../films/dto';
import { Film } from './film.entity';

@Entity()
export class Schedule extends ScheduleDto {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column()
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules)
  film: Film;
}
