import { Document, model, Schema } from 'mongoose';

export interface FilmScheduleDocument {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface FilmDocument extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: FilmScheduleDocument[];
}

const ScheduleSchema = new Schema<FilmScheduleDocument>({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: String, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], default: [] },
});

const FilmSchema = new Schema<FilmDocument>({
  id: { type: String, required: true, unique: true },
  rating: Number,
  director: String,
  tags: [String],
  title: String,
  about: String,
  description: String,
  image: String,
  cover: String,
  schedule: [ScheduleSchema],
});

export const FilmModel = model<FilmDocument>('Film', FilmSchema, 'films');
