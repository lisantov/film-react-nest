import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { isValidObjectId, ObjectId } from 'mongoose';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getFilmById(@Param('id') id: ObjectId) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Передан не валидный Id');
    return this.filmsService.getFilmSchedulesById(id!);
  }
}
