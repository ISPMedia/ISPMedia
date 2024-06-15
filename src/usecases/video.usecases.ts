import { VideoRepositoryPrisma } from "../repositories/video.repository";
import { VideoCreate } from "../interfaces/video.interface";

class VideoUseCase {
  private videoRepository: VideoRepositoryPrisma;
  constructor() {
    this.videoRepository = new VideoRepositoryPrisma();
  }

  async create(data: VideoCreate): Promise<String> {
    const result = await this.videoRepository.create(data);
    return result;
  }

  async getAllVideo(): Promise<any> {
    const result = await this.videoRepository.getAllVideo();
    return result;
  }
  async getVideoById(id: string): Promise<any> {
    const result = await this.videoRepository.getVideoById(id);
    return result;
  }

  async delete(id: string): Promise<any> {
    await this.videoRepository.delete(id);
  }
}

export { VideoUseCase };
