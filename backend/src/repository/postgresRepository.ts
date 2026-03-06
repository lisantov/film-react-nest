import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetFilmsDto, GetFilmDto, GetFilmSchedulesDto } from '../films/dto';
import { OrderDto } from '../order/dto';
import { randomUUID } from 'node:crypto';
import { IRepository } from '../database/database.module';
import { DataSource, Repository } from 'typeorm';
import { Film, Schedule } from '../entities';

@Injectable()
export class PostgresRepository implements IRepository {
  private filmRepository: Repository<Film>;
  private scheduleRepository: Repository<Schedule>;

  constructor(private connection: DataSource) {
    this.filmRepository = this.connection.getRepository(Film);
    this.scheduleRepository = this.connection.getRepository(Schedule);
  }

  async getAllFilms(): Promise<GetFilmsDto> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
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
    const duplicateSeat = schedule.taken.findIndex((s) => s === newTaken);

    if (duplicateSeat !== -1)
      throw new ConflictException('Это место уже занято');

    await this.scheduleRepository.update(
      { id: order.session },
      {
        ...schedule,
        taken: [...schedule.taken, newTaken],
      },
    );

    return {
      ...order,
      id: randomUUID(),
    };
  }
}
