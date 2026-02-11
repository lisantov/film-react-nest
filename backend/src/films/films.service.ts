import { Inject, Injectable } from '@nestjs/common';
import { GetFilmDto, GetFilmSchedulesDto } from './dto';
import { IRepository } from '../database/database.module';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('DATABASE') private readonly filmsRepository: IRepository,
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
