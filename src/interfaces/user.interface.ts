import { Member } from "./group.interface";
import { Review } from "./review.interface";
import { Playlist } from "./playlist.interface";
import { Video } from "./video.interface";
import { Group } from "./group.interface";
import { Album } from "./album.interface";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  group: Member[];
  review: Review[];
  playlist: Playlist[];
  //music: Music[];
  video: Video[];
  ownerGroup: Group[];
  album: Album[];
  createdAt: Date;
}

export interface UserResponseDTO {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<String>;
  findByEmail(emai: string): Promise<User | null>;
  getById(userId: string): Promise<any>;
  updateUserRole(id: string, role: string): Promise<any>;
  delete(id: string): Promise<any>;
  getAllUser(): Promise<any>;
  getAllUser(): Promise<any>;
}
