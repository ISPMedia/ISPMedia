export interface Album {
  id: string;
  title: string;
  release_date: string;
  artist: String;
  music: string;
  review: string;
  group: string;
}

export interface AlbumCreate {
  title: string;
  release_date: string;
  artist: string;
  userId: string
}

export interface AddMusicAlbum{
  albumId: string
  musicId: string
}

export interface IAlbumRepository {
  create(data: AlbumCreate): Promise<string>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<any>;
  getAlbumById(id: string): Promise<any>;
  getAllAlbum(): Promise<any>;
  //addMusicToAlbum(data: AddMusicAlbum);
  //removeMusicFromAlbum(albumId: string);
}