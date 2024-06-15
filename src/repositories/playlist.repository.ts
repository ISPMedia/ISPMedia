import { prisma } from "../lib/prisma";
import {
  IPlaylistRepository,
  PlaylistCreate,
} from "../interfaces/playlist.interface";

class PlaylistRepositoryPrisma implements IPlaylistRepository {
  async create(data: PlaylistCreate): Promise<string> {
    const defaultGroup = await prisma.group.findUnique({
      where: { name: "public" },
    });
    if (!defaultGroup) {
      throw new Error("Default group not found");
    }
    const playlist = await prisma.playlist.create({
      data: {
        name: data.name,
        userId: data.userId,
      },
    });
    return playlist.id;
  }

  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {
    await prisma.playlist.delete({
      where: {
        id,
      },
    });
  }

  async getPlaylistById(id: string): Promise<any> {
    const result = await prisma.playlist.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  async getAllPlaylist(): Promise<any> {
    const result = await prisma.playlist.findMany({});
    return result;
  }

  async addMusicToPlaylist(musicId: string, playlistId: string): Promise<any> {
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        music: {
          connect: { id: musicId },
        },
      },
    });
  }

  async removeMusicFromPlaylist(
    playlistId: string,
    musicId: string
  ): Promise<any> {
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        music: {
          disconnect: { id: musicId },
        },
      },
    });
  }
}
export { PlaylistRepositoryPrisma };
