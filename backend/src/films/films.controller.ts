import { Controller, Get, Param } from '@nestjs/common';

@Controller('films')
export class FilmsController {
  @Get()
  getFilms() {
    return 'Тут вернутся фильмы';
  }

  @Get(':id/schedule')
  getFilmById(@Param('id') id: string) {
    return `Тут вернётся фильм с id ${id}`;
  }
}
