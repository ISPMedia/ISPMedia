import { User } from "./user.interface";
import { Composer } from "./composer.interface";
import { Playlist } from "./playlist.interface";
import { Group } from "./group.interface";
import { Artist } from "./artist.interface";
import { Album } from "./album.interface";
import { Genre } from "./genre.interface";

export interface Music {
  id: string;
  title: string;
  description?: string | null;
  lyrics?: string | null;
  publisher: string;
  path: string;
  filename: string;
  mimetype: string;
  composer: Composer[];
  playlist: Playlist[];
  group: Group[];
  artistId: string;
  artist: Artist;
  albumId?: string | null;
  album?: Album | null;
  genreId: string;
  genre: Genre;
  userId: string;
  user: User;
}

export interface MusicCreate {
  title: string;
  description?: string;
  lyrics: string;
  publisher: string;
  filename: string;
  mimetype: string;
  path: string;
  userId: string;
  artist: string;
  albumId: string;
  genreId: string;
  composer: string;
}

export interface IMusicRepository {
  create(data: MusicCreate): Promise<string>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<any>;
  getMusicById(id: string): Promise<any>;
  getAllMusic(): Promise<any>;
}
