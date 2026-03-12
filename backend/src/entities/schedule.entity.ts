import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleDto } from '../films/dto';
import { Film } from './film.entity';

@Entity('schedules')
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

  @Column({ nullable: true })
  price: number;

  @Column('simple-array')
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules)
  film: Film;
}
