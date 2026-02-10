import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../repository/mongoRepository';
import { ObjectId } from 'mongoose';
import { GetFilmDto, GetFilmSchedulesDto } from './dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: MongoRepository) {}

  getAllFilms() {
    return this.filmsRepository.getAllFilms();
  }

  getFilmById(id: ObjectId): Promise<GetFilmDto> {
    return this.filmsRepository.getFilmById(id);
  }

  getFilmSchedulesById(id: ObjectId): Promise<GetFilmSchedulesDto> {
    return this.filmsRepository.getFilmSchedulesById(id);
  }
}
