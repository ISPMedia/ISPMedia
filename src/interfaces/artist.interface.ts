import { Album } from "./album.interface";
import { Music } from "./music.interface";

export interface Artist {
  id: string;
  name: string;
  music: Music[];
  album: Album[];
}
