import { prisma } from "../lib/prisma";
import { IGenreRepository } from "../interfaces/genre.interface";

class GenreRepositoryPrisma implements IGenreRepository {
  async create(name: string): Promise<string> {
    const data = await prisma.genre.create({
      data: {
        name: name,
      },
    });
    return data.id;
  }

  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {
    await prisma.genre.delete({
      where: {
        id,
      },
    });
  }

  async getGenreById(id: string): Promise<any> {
    const result = await prisma.genre.findFirst({
      where: {
        id,
      },
    });
    return result;
  }
  
  async getAllGenre(): Promise<any> {
    const result = await prisma.genre.findMany({});
    return result;
  }
}
export { GenreRepositoryPrisma };
