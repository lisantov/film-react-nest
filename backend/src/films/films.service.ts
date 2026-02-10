import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from '../repository/mongoRepository';
import { GetFilmDto, GetFilmSchedulesDto } from './dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('DATABASE') private readonly filmsRepository: MongoRepository,
  ) {}

  getAllFilms() {
    return this.filmsRepository.getAllFilms();
  }

  getFilmById(id: string): Promise<GetFilmDto> {
    return this.filmsRepository.getFilmById(id);
  }

  getFilmSchedulesById(id: string): Promise<GetFilmSchedulesDto> {
    return this.filmsRepository.getFilmSchedulesById(id);
  }
}
