import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';
import {
  IFilm,
  ISchedule,
  GetFilmsDto,
  GetFilmDto,
  GetFilmSchedulesDto,
} from '../films/dto';
import { OrderDto } from '../order/dto';
import { randomUUID } from 'node:crypto';

const ScheduleSchema = new mongoose.Schema<ISchedule>(
  {
    id: {
      type: String,
      required: true,
    },
    daytime: {
      type: String,
      required: true,
    },
    hall: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taken: {
      type: [String],
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  },
);

const FilmSchema = new mongoose.Schema<IFilm>(
  {
    id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    schedule: {
      type: [ScheduleSchema],
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Film = mongoose.model<IFilm>('films', FilmSchema);

@Injectable()
export class MongoRepository {
  constructor(private connection: Mongoose) {}

  async getAllFilms(): Promise<GetFilmsDto> {
    const films = await Film.find({}, { _id: 0, schedule: 0 });
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmById(id: string): Promise<GetFilmDto> {
    const film = await Film.findOne({ id }).select('-_id');

    if (!film) throw new NotFoundException('С фильм с переданным Id не найден');

    return {
      item: film,
    };
  }

  async getFilmSchedulesById(id: string): Promise<GetFilmSchedulesDto> {
    const film = await Film.findOne({ id });

    if (!film) throw new NotFoundException('С фильм с переданным Id не найден');

    const schedules = film.schedule;
    return {
      total: schedules.length,
      items: schedules,
    };
  }

  async createOrder(order: Omit<OrderDto, 'id'>): Promise<OrderDto> {
    const film = await Film.findOne({ id: order.film });

    if (!film)
      throw new NotFoundException(`С фильм с Id ${order.film} не найден`);

    const scheduleIndex = film.schedule.findIndex(
      (s) => s.id === order.session,
    );

    if (scheduleIndex === -1)
      throw new NotFoundException(`Сеанс с Id ${order.session} не найден`);

    const newTaken = `${order.row}:${order.seat}`;
    const duplicateSeat = film.schedule[scheduleIndex].taken.findIndex(
      (s) => s === newTaken,
    );

    if (duplicateSeat !== -1)
      throw new ConflictException('Это место уже занято');

    film.schedule[scheduleIndex].taken.push(newTaken);
    await film.save();

    return {
      ...order,
      id: randomUUID(),
    };
  }
}
