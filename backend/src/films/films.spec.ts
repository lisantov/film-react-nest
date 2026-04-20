import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from "./films.service";
import { IRepository } from "../database/database.module";

const schedules = [{
    id: '11',
    daytime: 'test',
    hall: 1,
    rows: 1,
    seats: 1,
    price: 1,
    taken: []
}]
const films = [
    {
        id: '1',
        rating: 5,
        director: 'Robert',
        tags: ['horror'],
        image: 'test',
        cover: 'test',
        title: 'test horror',
        about: 'test about',
        description: 'test description',
        schedule: schedules,
    },
    {
        id: '2',
        rating: 5,
        director: 'David',
        tags: ['horror'],
        image: 'test',
        cover: 'test',
        title: 'test horror',
        about: 'test about',
        description: 'test description',
        schedule: schedules,
    }
]
const getAllFilmsMock = () => ({
    total: films.length,
    items: films
})
const getFilmByIdMock = (id: string) => ({
    item: films.find(i => i.id === id)
})
const getFilmSchedulesByIdMock = (id: string) => ({
    total: schedules.length,
    item: films.find(i => i.id === id).schedule,
})

describe('Films', () => {
  let service: FilmsService
  let database: IRepository

  beforeEach(async () => {
    const module: TestingModule = await Test
        .createTestingModule({
          providers: [
            FilmsService,
            {
              provide: 'DATABASE',
              useValue: {
                getAllFilms: jest.fn().mockImplementation(getAllFilmsMock),
                getFilmById: jest.fn().mockImplementation(getFilmByIdMock),
                getFilmSchedulesById: jest.fn().mockImplementation(getFilmSchedulesByIdMock),
              }
            }
          ],
        })
        .compile();

    service = module.get<FilmsService>(FilmsService)
    database = module.get<IRepository>('DATABASE')
  });

  it('.getAllFilms() should call service and repository methods', () => {
    service.getAllFilms()

    expect(database.getAllFilms).toHaveBeenCalled();
  });

  it('.getAllFilms() should return all films', () => {
    const data = service.getAllFilms()

    expect(data).toEqual(getAllFilmsMock());
  });

  it('.getFilmById() should call service and repository methods', () => {
    service.getFilmById(films[0].id)

    expect(database.getFilmById).toHaveBeenCalled();
  });

  it('.getFilmById() should return correct film', () => {
    const data = service.getFilmById(films[0].id)

    expect(data).toEqual({ item: films[0] });
  });

  it('.getFilmSchedulesById() should call service and repository methods', () => {
    service.getFilmSchedulesById(films[0].id)

    expect(database.getFilmSchedulesById).toHaveBeenCalled();
  });

  it('.getFilmSchedulesById() should return correct film', () => {
    const data = service.getFilmSchedulesById(films[0].id)

    expect(data).toEqual({
        total: films[0].schedule.length,
        item: films[0].schedule
    });
  });
});
