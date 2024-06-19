import { prisma } from "../lib/prisma";
import { IMusicRepository, MusicCreate } from "../interfaces/music.interface";

class MusicRepositoryPrisma implements IMusicRepository {
  async create(data: MusicCreate): Promise<string> {
    const defaultGroup = await prisma.group.findUnique({
      where: { name: "public" },
    });
    if (!defaultGroup) {
      throw new Error("Default group not found");
    }

    // Artist
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

    // Composer
    let composerId: string;
    const existingComposer = await prisma.composer.findFirst({
      where: { name: data.composer },
    });

    if (existingComposer) {
      composerId = existingComposer.id;
    } else {
      const newComposer = await prisma.composer.create({
        data: { name: data.composer },
      });
      composerId = newComposer.id;
    }

    const musicData: any = {
      title: data.title,
      description: data.description,
      lyrics: data.lyrics,
      publisher: data.publisher,
      filename: data.filename,
      mimetype: data.mimetype,
      path: data.path,
      user: { connect: { id: data.userId } },
      albumId: data.albumId,
      genre: { connect: { id: data.genreId } },
      group: { connect: { id: defaultGroup.id } },
      composer: { connect: { id: composerId } },
    };

    if (artistId) {
      musicData.artist = { connect: { id: artistId } };
    }

    const music = await prisma.music.create({
      data: musicData,
    });
    return music.id;
  }
  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {
    return await prisma.music.delete({
      where: {
        id,
      },
    });
  }

  async getMusicById(id: string): Promise<any> {
    const result = await prisma.music.findUnique({
      where:{
        id
      }
    })
    //const music = {...result, size: result?.size.toString()}
    return result;
  }

  async getAllMusic(): Promise<any> {
    const music = await prisma.music.findMany();
    return music;
  }
}

export { MusicRepositoryPrisma };
