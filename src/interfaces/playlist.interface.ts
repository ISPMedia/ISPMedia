import { Group } from "./group.interface";
export interface Playlist {
  id: string;
  name: string;
  group: Group[];
  music: any[];
  userId: string;
}

export interface PlaylistCreate {
  name: string;
  userId: string;
}

export interface IPlaylistRepository {
  create(data: PlaylistCreate): Promise<string>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<any>;
  getPlaylistById(id: string): Promise<any>;
  getAllPlaylist(): Promise<any>;
  addMusicToPlaylist(musicId: string, playlistId: string): Promise<any>;
  removeMusicFromPlaylist(playlistId: string, musicId: string): Promise<any>;
}
