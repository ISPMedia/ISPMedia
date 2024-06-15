import { prisma } from "../lib/prisma";
import { VideoRepository, VideoCreate } from "../interfaces/video.interface";

class VideoRepositoryPrisma implements VideoRepository {
  async create(data: VideoCreate): Promise<String> {
    const defaultGroup = await prisma.group.findUnique({
      where: { name: "public" },
    });
    if (!defaultGroup) {
      throw new Error("Default group not found");
    }
    const video = await prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        path: data.path,
        size: data.size,
        filename: data.filename,
        mimetype: data.mimetype,
        userId: data.userId,
        group: {
          connect: {
            id: defaultGroup.id,
          },
        },
      },
    });
    return video.id;
  }
  async getAllVideo(): Promise<any> {
    const result = await prisma.video.findMany();
    // Mapeando os vídeos para converter o campo 'size' para string
    const videos = result.map(video => ({
      ...video,
      size: video.size.toString()
    }));

    return videos;
  }
  async getVideoById(id: string): Promise<any> {
    const result = await prisma.video.findUnique({
      where: {
        id,
      },
    });
    const video = {...result, size: result?.size.toString()}
    return video;
  }

  async delete(id: string): Promise<any> {
    return await prisma.video.delete({
      where: {
        id,
      },
    });
  }

  update(id: string): Promise<null> {
    return null!;
  }
}
export { VideoRepositoryPrisma };
