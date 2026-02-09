import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  getAllFilms() {
    return this.filmsRepository.getAllFilms();
  }
}
