import { FilmDto } from './film.dto';

export class GetFilmsDto {
  total: number;
  items: FilmDto[];
}
