import { PlaylistRepositoryPrisma } from "../repositories/playlist.repository";
import { PlaylistCreate } from "../interfaces/playlist.interface";

class PlaylistUseCase {
  private playlistRepository: PlaylistRepositoryPrisma;
  constructor(playlistRepository: PlaylistRepositoryPrisma) {
    this.playlistRepository = playlistRepository;
  }

  async create(data: PlaylistCreate): Promise<string> {
    const result = await this.playlistRepository.create(data);
    return result;
  }

  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {
    return await this.playlistRepository.delete(id);
  }

  async getPlaylistById(id: string): Promise<any> {
    const playlist = await this.playlistRepository.getPlaylistById(id);
    return playlist;
  }

  async getAllPlaylist(): Promise<any> {
    const playlists = await this.playlistRepository.getAllPlaylist();
    return playlists;
  }

  async addMusicToPlaylist(musicId: string, playlistId: string): Promise<any> {
    await this.playlistRepository.addMusicToPlaylist(musicId, playlistId);
  }

  async removeMusicFromPlaylist(
    playlistId: string,
    musicId: string
  ): Promise<any> {
    await this.playlistRepository.removeMusicFromPlaylist(playlistId, musicId);
  }
}

export { PlaylistUseCase };
