import { GenreRepositoryPrisma } from "../repositories/genre.repository";

class GenreUseCase {
  private genreRespository: GenreRepositoryPrisma;
  constructor(genreRespository: GenreRepositoryPrisma) {
    this.genreRespository = genreRespository;
  }

  async create(name: string): Promise<string> {
    const result = await this.genreRespository.create(name);
    return result;
  }
  async update(id: string): Promise<any> {}
  async delete(id: string): Promise<any> {
    await this.genreRespository.delete(id);
  }
  async getGenreById(id: string): Promise<any> {
    const result = await this.genreRespository.getGenreById(id);
    return result;
  }
  async getAllGenre(): Promise<any> {
    const result = await this.genreRespository.getAllGenre();
    return result;
  }
}

export { GenreUseCase };
