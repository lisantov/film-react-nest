import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  GetFilmsDto,
  GetFilmDto,
  GetFilmSchedulesDto,
  FilmDto,
  ScheduleDto,
} from '../films/dto';
import { OrderDto } from '../order/dto';
import { randomUUID } from 'node:crypto';
import { IRepository } from '../database/database.module';
import {
  Column,
  Entity, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

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

@Injectable()
export class PostgresRepository implements IRepository {
  private filmRepository: Repository<Film>;
  private scheduleRepository: Repository<Schedule>;

  async getAllFilms(): Promise<GetFilmsDto> {
    const films = await this.filmRepository.find({ relations: ['schedules'] });
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmById(id: string): Promise<GetFilmDto> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) throw new NotFoundException('С фильм с переданным Id не найден');

    return {
      item: film,
    };
  }

  async getFilmSchedulesById(id: string): Promise<GetFilmSchedulesDto> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) throw new NotFoundException('С фильм с переданным Id не найден');

    const schedules = film.schedules;
    return {
      total: schedules.length,
      items: schedules,
    };
  }

  async createOrder(order: Omit<OrderDto, 'id'>): Promise<OrderDto> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: order.session },
    });

    if (schedule)
      throw new NotFoundException(`Сеанс с Id ${order.session} не найден`);

    const newTaken = `${order.row}:${order.seat}`;
    const duplicateSeat = schedule.taken.findIndex(
      (s) => s === newTaken,
    );

    if (duplicateSeat !== -1)
      throw new ConflictException('Это место уже занято');

    // const queryBuilder = await connection.createQueryBuilder()
    // schedule.taken.push(newTaken);

    return {
      ...order,
      id: randomUUID(),
    };
  }
}
