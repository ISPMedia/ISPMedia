export interface ShareFile {
  id: string;
  ownerId: string;
  userId: string;
  videoId?: string;
  musicId?: string;
  playlistId?: string;
}

export interface ShareFileCreate {
  userId: string;
  videoId?: string;
  musicId?: string;
  playlistId?: string;
}

export interface ShareFileRepository {
  create(data: ShareFile): Promise<String>;
  getAllShareFile(): Promise<any>;
  getShareFileById(id: string): Promise<any>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<null>;
}
