import { prisma } from "../lib/prisma";
import { replacer } from "../utils/helpersFunctions";
import { AlbumCreate, IAlbumRepository } from "../interfaces/album.interface";

class AlbumRepositoryPrisma implements IAlbumRepository {
  async create(data: AlbumCreate): Promise<string> {
    const defaultGroup = await prisma.group.findUnique({
      where: { name: "public" },
    });
    if (!defaultGroup) {
      throw new Error("Default group not found");
    }
    const albumData: any = {
      title: data.title,
      release_date: data.release_date,
      userId: data.userId,
      group: {
        connect: {
          id: defaultGroup.id,
        },
      },
    };
    if (data.artist) {
      let artistId: string;
      const existingArtist = await prisma.artist.findFirst({
        where: { name: data.artist },
      });

      if (existingArtist) {
        artistId = existingArtist.id;
      } else {
        const newArtist = await prisma.artist.create({
          data: { name: data.artist },
        });
        artistId = newArtist.id;
      }
      albumData.artistId = artistId;
    }

    const album = await prisma.album.create({
      data: albumData,
    });

    return album.id;
  }
  async update(id: string): Promise<any> {}
  async delete(id: string): Promise<any> {
    await prisma.album.delete({
      where: {
        id,
      },
    });
  }

  async getAlbumById(id: string): Promise<any> {
    const result = await prisma.album.findUnique({
      where: {
        id,
      },
      include: {
        music: true,
        review: true,
        group: true,
        artist: true,
        user: true,
      },
    });
    return JSON.parse(JSON.stringify(result, replacer));
  }

  async getAllAlbum(): Promise<any> {
    const result = await prisma.album.findMany({
      include: {
        music: true,
        review: true,
        group: true,
        artist: true,
        user: true,
      },
    });
    return JSON.parse(JSON.stringify(result, replacer));
  }
}

export { AlbumRepositoryPrisma };
