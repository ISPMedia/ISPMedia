import { AlbumRepositoryPrisma } from "../repositories/album.repository";
import { AlbumCreate } from "../interfaces/album.interface";

class AlbumUseCase {
  private albumRepository: AlbumRepositoryPrisma;
  constructor() {
    this.albumRepository = new AlbumRepositoryPrisma();
  }

  async create(data: AlbumCreate): Promise<string> {
    const result = await this.albumRepository.create(data);
    return result;
  }
  async update(id: string): Promise<any> {}
  async delete(id: string): Promise<any> {
    await this.albumRepository.delete(id);
  }
  async getAlbumById(id: string): Promise<any> {
    const result = await this.albumRepository.getAlbumById(id);
    return result;
  }
  async getAllAlbum(): Promise<any> {
    const result = await this.albumRepository.getAllAlbum();
    return result;
  }
}

export { AlbumUseCase };
