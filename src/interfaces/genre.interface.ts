import { Music } from "./music.interface";

export interface Genre {
  id: string;
  name: string;
  music: Music[];
}

export interface IGenreRepository {
  create(name: string): Promise<string>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<any>;
  getGenreById(id: string): Promise<any>;
  getAllGenre(): Promise<any>;
}
