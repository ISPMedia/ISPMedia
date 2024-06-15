import { MusicRepositoryPrisma } from "../repositories/music.repository";
import { MusicCreate } from "../interfaces/music.interface";

class MusicUseCase {
  private musicRepository: MusicRepositoryPrisma;
  constructor() {
    this.musicRepository = new MusicRepositoryPrisma();
  }

  async create(data: MusicCreate): Promise<String> {
    const result = await this.musicRepository.create(data);
    return result;
  }

  update(id: string): Promise<any> {
    return null!;
  }

  async delete(id: string): Promise<any> {
    return await this.musicRepository.delete(id);
  }

  async getMusicById(id: string): Promise<any> {
    const result = await this.musicRepository.getMusicById(id);
    return result;
  }
  
  async getAllMusic(): Promise<any> {
    const result = await this.musicRepository.getAllMusic();
    return result;
  }
}

export { MusicUseCase };
