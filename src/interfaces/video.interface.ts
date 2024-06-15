export interface Video {
  id: string;
  video: string;
  description: string;
  duration: Number;
}

export interface VideoCreate {
  title: string;
  path: string;
  description: string;
  filename: string;
  mimetype: string;
  size: bigint;
  userId: string;
}

export const VideoResponse = {
  user: true, // Include all user fields
  group: true,
};

export interface VideoRepository {
  create(data: VideoCreate): Promise<String>;
  getAllVideo(): Promise<any>;
  getVideoById(id: string): Promise<any>;
  delete(id: string): Promise<any>;
  update(id: string): Promise<null>;
}
