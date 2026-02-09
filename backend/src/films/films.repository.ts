import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';

export interface Schedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface Film {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: Schedule[];
}

const ScheduleSchema = new mongoose.Schema<Schedule>(
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
  },
);

const FilmSchema = new mongoose.Schema<Film>(
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

const Film = mongoose.model<Film>('films', FilmSchema);

@Injectable()
export class FilmsRepository {
  constructor(@Inject('DATABASE') connection: Mongoose) {}

  getAllFilms() {
    return Film.find();
  }
}
